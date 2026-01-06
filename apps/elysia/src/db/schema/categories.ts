import { pgTable, varchar } from "drizzle-orm/pg-core";
import { commonColumns } from "../helpers/columns";

export const categoriesTable = pgTable("categories", {
  ...commonColumns,
  name: varchar("name", { length: 128 }).notNull().unique(),
  description: varchar("description", { length: 255 }),
});
