import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { commonColumns } from "../helpers/columns";

export const warehousesTable = pgTable("warehouses", {
  ...commonColumns,
  name: varchar("name", { length: 255 }).notNull().unique(),
  location: varchar("location", { length: 255 }),
  isActive: boolean("is_active").default(true),
  notes: varchar("notes", { length: 255 }),
});
