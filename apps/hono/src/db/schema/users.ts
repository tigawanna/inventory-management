import { boolean, integer, jsonb, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";

export const roles = ["admin", "user", "suspended"] as const;

export const userRole = pgEnum("role", roles);
export const usersTable = pgTable("users", {
  ...commonColumns,
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  avatarUrl: text(),
  role: userRole().default("user"),
  refreshToken: text(),
  refreshTokenVersion: integer().default(0),
  verificationToken: text(),
  isEmailVerified: boolean().default(false),
  metadata: jsonb("metadata").$type<Record<string, any>>().default({}),
  lastLoginAt: timestamp("last_login_at").defaultNow(),
});

export const passwordResets = pgTable("password_resets", {
  ...commonColumns,
  userId: text("user_id")
    .references(() => usersTable.id)
    .notNull(),
  token: text("token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  isUsed: boolean("is_used").default(false),
});
