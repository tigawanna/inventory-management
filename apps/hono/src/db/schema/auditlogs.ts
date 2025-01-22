import { relations } from "drizzle-orm";
import { jsonb, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";
import { usersTable } from "./users";

export const auditAction = [
  "CREATE",
  "UPDATE",
  "DELETE",
  "LOGIN",
  "LOGOUT",
  "PASSWORD_RESET",
  "EMAIL_VERIFY",
] as const;
export const auditActionEnum = pgEnum("action", auditAction);
export const entityType = [
  "USER",
  "INVENTORY",
  "CATEGORY",
] as const;
export const entityTypenum = pgEnum("entity_type", entityType);

export const auditLogsTable = pgTable("audit_logs", {
  ...commonColumns,
  userId: text("user_id").references(() => usersTable.id),
  action: auditActionEnum("action").notNull(),
  entityType: entityTypenum("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  oldData: jsonb("old_data"),
  newData: jsonb("new_data"),
  ipAddress: text("ip_address"),
});

export const auditLogRelations = relations(auditLogsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [auditLogsTable.userId],
    references: [usersTable.id],
  }),
}));
