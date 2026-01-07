import { relations } from "drizzle-orm";
import { integer, jsonb, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";
import { activitiesTable } from "./activities";
import { auditLogsTable } from "./audit_logs";
import { inventoryTransactionsTable } from "./inventory_transactions";
import { refreshTokensTable } from "./refresh_tokens";
import { userRolesTable } from "./roles";
import { systemSettingsTable } from "./system_settings";

/**
 * Users table - system user accounts
 * Core authentication and user management
 * Key fields:
 * - name: user's display name
 * - email: unique login identifier
 * - password: hashed password for authentication
 * - avatarUrl: profile picture URL
 * - lastLoginAt: most recent login timestamp
 * - metadata: flexible JSON field for additional user attributes
 * - refreshTokenVersion: incremented to invalidate all user's refresh tokens
 */
export const usersTable = pgTable("users", {
  ...commonColumns,
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  avatarUrl: varchar("avatar_url", { length: 255 }),
  lastLoginAt: timestamp("last_login_at").defaultNow(),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  refreshTokenVersion: integer("refresh_token_version").default(0),
});

/**
 * Users relations - defines all relationships from a user's perspective
 * - refreshTokens: JWT refresh tokens owned by the user (one-to-many)
 * - userRoles: role assignments for this user (one-to-many)
 * - performedTransactions: inventory transactions performed by this user (one-to-many)
 * - auditLogs: audit trail entries created by this user's actions (one-to-many)
 * - activities: activity feed entries for this user (one-to-many)
 * - updatedSettings: system settings last modified by this user (one-to-many)
 */
export const usersRelations = relations(usersTable, ({ many }) => ({
  refreshTokens: many(refreshTokensTable),
  userRoles: many(userRolesTable),
  performedTransactions: many(inventoryTransactionsTable),
  auditLogs: many(auditLogsTable),
  activities: many(activitiesTable),
  updatedSettings: many(systemSettingsTable),
}));

