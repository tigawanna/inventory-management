import { relations } from "drizzle-orm";
import { jsonb, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";
import { usersTable } from "./users";

/**
 * System settings table - application configuration key-value store
 * Stores runtime-modifiable settings without requiring code deployment
 * Key fields:
 * - key: unique setting identifier (e.g., "maintenance_mode", "max_upload_size")
 * - value: JSON-encoded setting value (supports complex data structures)
 * - description: explanation of what this setting controls
 * - updatedByUserId: who last modified this setting
 * - updatedAt: when the setting was last changed
 * Enables dynamic configuration with audit trail
 */
export const systemSettingsTable = pgTable("system_settings", {
  ...commonColumns,
  key: varchar("key", { length: 128 }).notNull().unique(),
  value: jsonb("value").$type<Record<string, any>>().notNull(),
  description: varchar("description", { length: 255 }),
  updatedByUserId: uuid("updated_by_user_id").references(() => usersTable.id),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/**
 * System settings relations - configurable application settings
 * - updatedBy: the user who last modified this setting (many-to-one)
 * Key-value store for runtime configuration with audit trail
 */
export const systemSettingsRelations = relations(systemSettingsTable, ({ one }) => ({
  updatedBy: one(usersTable, {
    fields: [systemSettingsTable.updatedByUserId],
    references: [usersTable.id],
  }),
}));
