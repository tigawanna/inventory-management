import { jsonb, pgEnum, pgTable, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { commonColumns } from "../helpers/columns";
import { usersTable } from "./users";

export const activityTypeEnum = pgEnum("activity_type", [
  "LOW_STOCK",
  "TRANSACTION_CREATED",
  "USER_LOGIN",
  "USER_LOGOUT",
  "SETTINGS_UPDATED",
]);

export const activitiesTable = pgTable("activities", {
  ...commonColumns,
  type: activityTypeEnum("type").notNull(),
  message: varchar("message", { length: 255 }).notNull(),
  userId: integer("user_id").references(() => usersTable.id),
  entityType: varchar("entity_type", { length: 64 }),
  entityId: integer("entity_id"),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  occurredAt: timestamp("occurred_at").defaultNow(),
});

export const activitiesRelations = relations(activitiesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [activitiesTable.userId],
    references: [usersTable.id],
  }),
}));
