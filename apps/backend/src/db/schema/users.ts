import { pgTable, text, pgEnum, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { commonColumns } from "../helpers/columns.ts";

export const roles = ["admin", "user"] as const;

const userRole = pgEnum("role", roles);
export const usersTable = pgTable("users", {
  ...commonColumns,
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  avatarUrl: text(),
  role: userRole().default("user"),
  verificationToken: text(),
  isEmailVerified: boolean().default(false),
});

export const auditLogs = pgTable("audit_logs", {
  ...commonColumns,
  userId: text("user_id").references(() => usersTable.id),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  oldData: jsonb("old_data"),
  newData: jsonb("new_data"),
  ipAddress: text("ip_address"),
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

export const refreshTokens = pgTable("refresh_tokens", {
  ...commonColumns,
  userId: text("user_id")
    .references(() => usersTable.id)
    .notNull(),
  token: text("token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  isRevoked: boolean("is_revoked").default(false),
  family: text("family").notNull(), // For token rotation
});
