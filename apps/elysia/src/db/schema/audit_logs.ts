import { jsonb, pgEnum, pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { commonColumns } from "../helpers/columns";
import { usersTable } from "./users";

export const auditActionEnum = pgEnum("audit_action", [
  "CREATE",
  "UPDATE",
  "DELETE",
  "LOGIN",
  "LOGOUT",
]);

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

export const auditLogsTable = pgTable("audit_logs", {
  ...commonColumns,
  userId: integer("user_id").references(() => usersTable.id),
  action: auditActionEnum("action").notNull(),
  entityType: entityTypeEnum("entity_type").notNull(),
  entityId: integer("entity_id").notNull(),
  oldData: jsonb("old_data").$type<Record<string, any>>(),
  newData: jsonb("new_data").$type<Record<string, any>>(),
  ipAddress: varchar("ip_address", { length: 64 }),
});

export const auditLogRelations = relations(auditLogsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [auditLogsTable.userId],
    references: [usersTable.id],
  }),
}));
