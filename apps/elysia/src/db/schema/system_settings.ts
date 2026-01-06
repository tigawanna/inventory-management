import { jsonb, pgTable, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { commonColumns } from "../helpers/columns";
import { usersTable } from "./users";

export const systemSettingsTable = pgTable("system_settings", {
  ...commonColumns,
  key: varchar("key", { length: 128 }).notNull().unique(),
  value: jsonb("value").$type<Record<string, any>>().notNull(),
  description: varchar("description", { length: 255 }),
  updatedByUserId: integer("updated_by_user_id").references(() => usersTable.id),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const systemSettingsRelations = relations(systemSettingsTable, ({ one }) => ({
  updatedBy: one(usersTable, {
    fields: [systemSettingsTable.updatedByUserId],
    references: [usersTable.id],
  }),
}));
