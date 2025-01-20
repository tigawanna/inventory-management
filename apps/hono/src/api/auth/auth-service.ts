import { compare, hash } from "bcrypt";
import { eq } from "drizzle-orm";
import { randomBytes } from "node:crypto";

import { db } from "@/db/client";
import { passwordResets, usersTable } from "@/db/schema/users";
import {
  auditAction,
  AuditLogService,
  entityType,
} from "@/services/audit-log.service";
import { EmailService } from "@/services/email-service";
import * as tokenService from "@/services/token-service";

import type { UserItem } from "../users/schema";

import { MyAuthError } from "./auth-errors";

export class AuthService {
  private readonly SALT_ROUNDS = 10;
  private emailService: EmailService;
  private auditLogService: AuditLogService;
  constructor() {
    this.emailService = new EmailService();
    this.auditLogService = new AuditLogService();
  }

  async getUser(userId: string) {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, userId),
    });
    if (!user) {
      throw new Error("User not found");
    }

    // Exclude sensitive data
    return filterUserJWTPayload(user);
  }

  async currebtUser() {

  }

  async register(
    data: { email: string; password: string; name: string },
  ) {
    const hashedPassword = await hash(data.password, this.SALT_ROUNDS);
    const verificationToken = randomBytes(3).toString("hex");
    const newUser = await db
      .insert(usersTable)
      .values({
        ...data,
        password: hashedPassword,
        verificationToken,
      })
      .returning();

    // Audit log the registration
    await this.auditLogService.create(
      {
        userId: newUser[0].id,
        action: auditAction.CREATE,
        entityType: entityType.USER,
        entityId: newUser[0].id,
        newData: { email: data.email, name: data.name },
      },
    );
    await this.emailService.sendEmail({
      mail_to: data.email,
      token: verificationToken,
      type: "verifyemail",
    });
    const userPayload = filterUserJWTPayload(newUser[0]);
    await tokenService.generateUserAuthTokens(userPayload);
    return newUser?.[0] ? filterUserJWTPayload(newUser[0]) : undefined;
  }

  async login(data: { email: string; password: string }) {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, data.email),
    });

    if (!user) {
      throw new MyAuthError("Invalid credentials");
    }
    const isValid = await compare(data.password, user.password);
    if (!isValid) {
      throw new MyAuthError("Invalid credentials");
    }
    await tokenService.generateUserAuthTokens(filterUserJWTPayload(user));
    await this.auditLogService.logLogin(user.id);
    return filterUserJWTPayload(user);
  }

  async requestVerifyEmail(email: string) {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });
    if (!user) {
      throw new Error("User not found");
    }
    const verificationToken = randomBytes(3).toString("hex");
    await this.emailService.sendEmail({
      mail_to: email,
      token: verificationToken,
      type: "verifyemail",
    });
    const updatedUser = await db
      .update(usersTable)
      .set({ verificationToken })
      .where(eq(usersTable.id, user.id))
      .returning();
    await tokenService.generateUserAuthTokens(filterUserJWTPayload(updatedUser[0]));
  }

  async verifyEmail({ email, token }: { token?: string; email?: string }) {
    const getUserByEmailOrToken = async (email?: string, token?: string) => {
      if (email) {
        return db.query.usersTable.findFirst({
          where: eq(usersTable.email, email),
        });
      }
      else if (token) {
        return db.query.usersTable.findFirst({
          where: eq(usersTable.verificationToken, token),
        });
      }
    };
    if (email && !token) {
      const user = await getUserByEmailOrToken(email);
      if (!user) {
        throw new Error("User not found");
      }
      const verificationToken = randomBytes(3).toString("hex");
      this.emailService.sendEmail({
        mail_to: email,
        token: verificationToken,
        type: "verifyemail",
      });
      await db
        .update(usersTable)
        .set({ verificationToken })
        .where(eq(usersTable.id, user.id));
      return;
      // throw new Error("Please check your email to verify your account");
    }
    const user = await getUserByEmailOrToken(undefined, token);
    if (!user) {
      throw new Error("Invalid verification token");
    }
    const newUser = await db
      .update(usersTable)
      .set({
        verificationToken: null,
        isEmailVerified: true,
      })
      .where(eq(usersTable.id, user.id))
      .returning();
    return newUser?.[0] ? filterUserJWTPayload(newUser[0]) : undefined;
  }

  async requestReset({ email }: { email: string }) {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    if (!user) {
      throw new Error("User not found");
    }

    const token = randomBytes(3).toString("hex");
    const expiresAt = new Date(Date.now() + 3_600_000); // 1 hour
    await db.insert(passwordResets).values({
      userId: user.id,
      token,
      expiresAt,
    });
    await this.emailService.sendEmail({
      mail_to: email,
      token,
      type: "resetpassword",
    });
  }

  async resetPassword(
    { token, newPassword }: { token: string; newPassword: string },
  ) {
    const reset = await db.query.passwordResets.findFirst({
      where: eq(passwordResets.token, token),
    });

    if (!reset) {
      throw new Error("Invalid token");
    }
    if (reset.expiresAt < new Date()) {
      throw new Error("Token expired");
    }

    const hashedPassword = await hash(newPassword, this.SALT_ROUNDS);
    await db.transaction(async (tx) => {
      await tx
        .update(usersTable)
        .set({ password: hashedPassword })
        .where(eq(usersTable.id, reset.userId ?? ""));

      await tx.delete(passwordResets).where(eq(passwordResets.token, token));
    });
    await tokenService.clearTokens();
  }
}

export function filterUserJWTPayload(user: UserItem) {
  const { password, refreshToken, verificationToken,refreshTokenVersion,...userPayload } = user;
  return userPayload;
}
