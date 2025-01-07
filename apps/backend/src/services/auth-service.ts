import { eq } from "drizzle-orm";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
const { verify } = jwt;
import { randomBytes } from "crypto";
import { db } from "@/db/client.ts";
import { passwordResets, usersTable } from "@/db/schema/users.ts";
import { EmailService } from "./email/email-service.ts";

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET!;

  private readonly SALT_ROUNDS = 10;

  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  async getUser(userId: string) {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, userId),
    });
    if (!user) throw new Error("User not found");

    // Exclude sensitive data
    const { password, verificationToken,refreshToken, ...userProfile } = user;
    return userProfile;
  }

  async register(data: { email: string; password: string; name: string }) {
    const hashedPassword = await hash(data.password, this.SALT_ROUNDS);
    const verificationToken = randomBytes(4).toString("hex");
    const newUser = await db
      .insert(usersTable)
      .values({
        ...data,
        password: hashedPassword,
        verificationToken,
      })
      .returning();

    await this.emailService.sendEmail({
      mail_to: data.email,
      token: verificationToken,
      type: "verifyemail",
    });

    return newUser[0];
  }

  async login(data: { email: string; password: string }) {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, data.email),
    });

    if (!user) throw new Error("Invalid credentials");
    const isValid = await compare(data.password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    return user;
  }

  async verifyEmail(token?: string, email?: string) {
    const getUserByEmailOrToken = async (email?: string, token?: string) => {
      if (email) {
        return db.query.usersTable.findFirst({
          where: eq(usersTable.email, email),
        });
      } else if (token) {
        return db.query.usersTable.findFirst({
          where: eq(usersTable.verificationToken, token),
        });
      }
      return;
    };
    if (email && !token) {
      const user = await getUserByEmailOrToken(email);
      if (!user) throw new Error("User not found");
      const verificationToken = randomBytes(4).toString("hex");
      this.emailService.sendEmail({
        mail_to: email,
        token: verificationToken,
        type: "verifyemail",
      });
      throw new Error("Please check your email to verify your account");
    }

    const user = await getUserByEmailOrToken(token);
    if (!user) throw new Error("Invalid verification token");
    return db
      .update(usersTable)
      .set({
        verificationToken: null,
        isEmailVerified: true,
      })
      .where(eq(usersTable.id, user.id))
      .returning();
  }

  async validateToken(token: string) {
    try {
      const payload = verify(token, this.JWT_SECRET);
      return payload;
    } catch {
      throw new Error("Invalid token");
    }
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, userId),
    });

    if (!user) throw new Error("User not found");

    const isValid = await compare(currentPassword, user.password);
    if (!isValid) throw new Error("Invalid current password");

    const hashedPassword = await hash(newPassword, this.SALT_ROUNDS);

    await db
      .update(usersTable)
      .set({ password: hashedPassword })
      .where(eq(usersTable.id, userId));
  }

  async requestReset(email: string) {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    if (!user) throw new Error("User not found");

    const token = randomBytes(4).toString("hex");
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

  async resetPassword(token: string, newPassword: string) {
    const reset = await db.query.passwordResets.findFirst({
      where: eq(passwordResets.token, token),
    });

    if (!reset) throw new Error("Invalid token");
    if (reset.expiresAt < new Date()) throw new Error("Token expired");

    const hashedPassword = await hash(newPassword, this.SALT_ROUNDS);
    await db.transaction(async (tx) => {
      await tx
        .update(usersTable)
        .set({ password: hashedPassword })
        .where(eq(usersTable.id, reset.userId ?? ""));

      await tx.delete(passwordResets).where(eq(passwordResets.token, token));
    });
  }


}
