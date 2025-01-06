import { pgTable, text, pgEnum, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { commonColumns } from "../helpers/columns.ts";

export const roles = ["admin", "user"] as const;

const userRole = pgEnum("role", roles);
export const usersTable = pgTable("users", {
  ...commonColumns,
  name: text().notNull(),
  email: text().notNull().unique(),
  avatarUrl: text(),
  role: userRole().default("user"),
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
  userId: text("user_id").references(() => usersTable.id),
  token: text("token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  isUsed: boolean("is_used").default(false),
});
