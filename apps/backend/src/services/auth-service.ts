import { eq } from "drizzle-orm";
import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { randomBytes } from "crypto";
import { db } from "@/db/client.ts";
import { passwordResets, usersTable } from "@/db/schema/users.ts";
import { EmailService } from "./email-service.ts";

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET!;

  private readonly SALT_ROUNDS = 10;

  async getUser(userId: string) {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, userId),
    });

    if (!user) throw new Error("User not found");

    // Exclude sensitive data
    const { password, verificationToken, ...userProfile } = user;
    return userProfile;
  }

  async register(data: { email: string; password: string; name: string }) {
    const hashedPassword = await hash(data.password, this.SALT_ROUNDS);
    const verificationToken = randomBytes(32).toString("hex");

    await db.insert(usersTable).values({
      ...data,
      password: hashedPassword,
      verificationToken,
    });

    await new EmailService().sendEmail({
      to: data.email,
      subject: "Verify your email",
      body: `
      reset your password

       ${process.env.API_URL}/auth/verify/${verificationToken}
      `,
    });
  }

  async login(email: string, password: string) {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    if (!user) throw new Error("Invalid credentials");

    const isValid = await compare(password, user.password);
    if (!isValid) throw new Error("Invalid credentials");

    const token = sign(
      {
        userId: user.id,
        role: user.role,
      },
      this.JWT_SECRET,
      { expiresIn: "24h" },
    );

    return { user, token };
  }

  async verifyEmail(token: string) {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.verificationToken, token),
    });

    if (!user) throw new Error("Invalid verification token");

    await db
      .update(usersTable)
      .set({
        verificationToken: null,
        isEmailVerified: true,
      })
      .where(eq(usersTable.id, user.id));
  }

  async validateToken(token: string) {
    try {
      const payload = verify(token, this.JWT_SECRET);
      return payload;
    } catch {
      throw new Error("Invalid token");
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, userId),
    });

    if (!user) throw new Error("User not found");

    const isValid = await compare(currentPassword, user.password);
    if (!isValid) throw new Error("Invalid current password");

    const hashedPassword = await hash(newPassword, this.SALT_ROUNDS);

    await db.update(usersTable).set({ password: hashedPassword }).where(eq(usersTable.id, userId));
  }

  async requestReset(email: string) {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    });

    if (!user) throw new Error("User not found");

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3_600_000); // 1 hour

    await db.insert(passwordResets).values({
      userId: user.id,
      token,
      expiresAt,
    });

    await new EmailService().sendEmail({
      to: email,
      subject: "Reset Password",
      body: `
      Reset your password:
      ${process.env.FRONTEND_URL}/reset-password?token=${token}
      `,
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
