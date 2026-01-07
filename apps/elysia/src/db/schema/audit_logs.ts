import { relations } from "drizzle-orm";
import { jsonb, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";
import { usersTable } from "./users";

/**
 * Audit action enum - types of actions that can be audited
 * Tracks CRUD operations and authentication events
 */
export const auditActionEnum = pgEnum("audit_action", [
  "CREATE",
  "UPDATE",
  "DELETE",
  "LOGIN",
  "LOGOUT",
]);

/**
 * Entity type enum - types of entities that can be audited
 * Defines all database entities that require audit trail tracking
 */
export const entityTypeEnum = pgEnum("entity_type", [
  "USER",
  "PRODUCT",
  "CATEGORY",
  "SUPPLIER",
  "WAREHOUSE",
  "TRANSACTION",
  "STOCK",
  "SETTINGS",
]);

/**
 * Audit logs table - comprehensive system audit trail
 * Records all significant actions for compliance, security, and debugging
 * Key fields:
 * - userId: who performed the action (nullable for system actions)
 * - action: what type of operation was performed
 * - entityType: what kind of entity was affected
 * - entityId: which specific entity was affected
 * - oldData: entity state before change (for updates/deletes)
 * - newData: entity state after change (for creates/updates)
 * - ipAddress: source IP for security tracking
 */
export const auditLogsTable = pgTable("audit_logs", {
  ...commonColumns,
  userId: uuid("user_id").references(() => usersTable.id),
  action: auditActionEnum("action").notNull(),
  entityType: entityTypeEnum("entity_type").notNull(),
  entityId: uuid("entity_id").notNull(),
  oldData: jsonb("old_data").$type<Record<string, any>>(),
  newData: jsonb("new_data").$type<Record<string, any>>(),
  ipAddress: varchar("ip_address", { length: 64 }),
});

/**
 * Audit logs relations - system-wide audit trail
 * - user: the user who performed the audited action (many-to-one)
 * Tracks all critical actions with before/after state for compliance and debugging
 */
export const auditLogsRelations = relations(auditLogsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [auditLogsTable.userId],
    references: [usersTable.id],
  }),
}));
