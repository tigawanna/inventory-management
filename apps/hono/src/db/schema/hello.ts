import { boolean, decimal, integer, pgTable, text } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";

export const helloTable = pgTable("hello", {
  ...commonColumns,
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  avatarUrl: text(),
  refreshToken: text(),
});
