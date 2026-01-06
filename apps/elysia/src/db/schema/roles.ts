import { index, pgTable, varchar, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { commonColumns } from "../helpers/columns";
import { usersTable } from "./users";

export const rolesTable = pgTable("roles", {
  ...commonColumns,
  name: varchar("name", { length: 64 }).notNull().unique(),
  description: varchar("description", { length: 255 }),
});

export const userRolesTable = pgTable(
  "user_roles",
  {
    ...commonColumns,
    userId: integer("user_id")
      .references(() => usersTable.id)
      .notNull(),
    roleId: integer("role_id")
      .references(() => rolesTable.id)
      .notNull(),
  },
  (table) => [
    index("user_roles_user_role_idx").on(table.userId, table.roleId),
  ]
);

export const rolesRelations = relations(rolesTable, ({ many }) => ({
  userRoles: many(userRolesTable),
}));

export const userRolesRelations = relations(userRolesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [userRolesTable.userId],
    references: [usersTable.id],
  }),
  role: one(rolesTable, {
    fields: [userRolesTable.roleId],
    references: [rolesTable.id],
  }),
}));
