import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";
import { usersTable } from "./users";

/**
 * Refresh tokens table - JWT refresh token persistence
 * Stores long-lived tokens for obtaining new access tokens
 * Key fields:
 * - userId: owner of this refresh token
 * - token: unique token string (hashed in production)
 * - expiresAt: token expiration timestamp
 * - revokedAt: set when token is manually invalidated
 * Enables secure session management and token rotation
 */
export const refreshTokensTable = pgTable("refresh_tokens", {
  ...commonColumns,
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  token: varchar("token", { length: 512 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  revokedAt: timestamp("revoked_at"),
});

/**
 * Refresh tokens relations - JWT refresh token storage
 * - user: the user who owns this refresh token (many-to-one)
 * Used for authentication token rotation and session management
 */
export const refreshTokensRelations = relations(refreshTokensTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [refreshTokensTable.userId],
    references: [usersTable.id],
  }),
}));
