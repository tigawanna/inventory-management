import { pgTable, integer, decimal, boolean, text } from "drizzle-orm/pg-core";
import { commonColumns } from "../helpers/columns.ts";

export const categories = pgTable("categories", {
  ...commonColumns,
  name: text("name").notNull().unique(),
  description: text("description"),
});

export const inventoryTable = pgTable("inventory", {
  ...commonColumns,
  name: text("name").notNull(),
  description: text("description"),
  quantity: integer("quantity").notNull().default(0),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  categoryId: text("category_id").references(() => categories.id),
  sku: text("sku").unique(),
  isActive: boolean("is_active").default(true),
});
