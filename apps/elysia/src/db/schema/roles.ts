import { relations } from "drizzle-orm";
import { index, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";
import { usersTable } from "./users";

/**
 * Roles table - role definitions for RBAC (Role-Based Access Control)
 * Defines available roles that can be assigned to users
 * Key fields:
 * - name: unique role identifier (e.g., "admin", "manager", "viewer")
 * - description: role purpose and permissions summary
 */
export const rolesTable = pgTable("roles", {
  ...commonColumns,
  name: varchar("name", { length: 64 }).notNull().unique(),
  description: varchar("description", { length: 255 }),
});

/**
 * User roles table - junction table for user-role assignments
 * Implements many-to-many relationship between users and roles
 * Key fields:
 * - userId: reference to user being assigned a role
 * - roleId: reference to role being assigned
 * Composite index optimizes permission checking queries
 */
export const userRolesTable = pgTable(
  "user_roles",
  {
    ...commonColumns,
    userId: uuid("user_id")
      .references(() => usersTable.id)
      .notNull(),
    roleId: uuid("role_id")
      .references(() => rolesTable.id)
      .notNull(),
  },
  (table) => [
    index("user_roles_user_role_idx").on(table.userId, table.roleId),
  ]
);

/**
 * Roles relations - defines relationships for role definitions
 * - userRoles: all user assignments for this role (one-to-many)
 * Used for RBAC (Role-Based Access Control) queries
 */
export const rolesRelations = relations(rolesTable, ({ many }) => ({
  userRoles: many(userRolesTable),
}));

/**
 * User roles relations - junction table connecting users to roles
 * - user: the user who has this role assignment (many-to-one)
 * - role: the role being assigned (many-to-one)
 * Enables many-to-many relationship between users and roles
 */
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
