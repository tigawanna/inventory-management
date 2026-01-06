import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { commonColumns } from "../helpers/columns";
import { usersTable } from "./users";

export const refreshTokensTable = pgTable("refresh_tokens", {
  ...commonColumns,
  userId: integer("user_id")
    .references(() => usersTable.id)
    .notNull(),
  token: varchar("token", { length: 512 }).notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  revokedAt: timestamp("revoked_at"),
});

export const refreshTokensRelations = relations(refreshTokensTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [refreshTokensTable.userId],
    references: [usersTable.id],
  }),
}));
