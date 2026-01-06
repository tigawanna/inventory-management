import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { jsonb } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";

export const usersTable = pgTable("users", {
  ...commonColumns,
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  avatarUrl: varchar("avatar_url", { length: 255 }),
  lastLoginAt: timestamp("last_login_at").defaultNow(),
  metadata: jsonb("metadata").$type<Record<string, any>>(),
  refreshTokenVersion: integer("refresh_token_version").default(0),
});

