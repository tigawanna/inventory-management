import { relations } from "drizzle-orm";
import { jsonb, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";
import { usersTable } from "./users";

/**
 * Activity type enum - categories of notable system events
 * Used for user notifications and activity feed generation
 */
export const activityTypeEnum = pgEnum("activity_type", [
  "LOW_STOCK",
  "TRANSACTION_CREATED",
  "USER_LOGIN",
  "USER_LOGOUT",
  "SETTINGS_UPDATED",
]);

/**
 * Activities table - user activity feed and notifications
 * Tracks important events for display in dashboards and notification systems
 * Key fields:
 * - type: category of activity event
 * - message: human-readable description of the activity
 * - userId: user this activity belongs to (nullable for system-wide events)
 * - entityType: type of entity involved in the activity
 * - entityId: specific entity reference
 * - metadata: additional structured data about the activity
 * - occurredAt: when the activity happened
 */
export const activitiesTable = pgTable("activities", {
  ...commonColumns,
  type: activityTypeEnum("type").notNull(),
  message: varchar("message", { length: 255 }).notNull(),
  userId: uuid("user_id").references(() => usersTable.id),
  entityType: varchar("entity_type", { length: 64 }),
  entityId: uuid("entity_id"),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  occurredAt: timestamp("occurred_at").defaultNow(),
});

/**
 * Activities relations - user activity feed
 * - user: the user this activity belongs to (many-to-one)
 * Used for dashboard notifications and user-specific activity streams
 */
export const activitiesRelations = relations(activitiesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [activitiesTable.userId],
    references: [usersTable.id],
  }),
}));
