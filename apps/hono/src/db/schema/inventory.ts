import { relations } from "drizzle-orm";
import { boolean, decimal, integer, pgTable, text } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

import { commonColumns } from "../helpers/columns";

export const categoryTable = pgTable("categories", {
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
  categoryId: text("category_id").references(() => categoryTable.id),
  sku: text("sku")
    .unique()
    .$defaultFn(() => uuidv7()),
  isActive: boolean("is_active").default(true),
  supplier: text("supplier"),
  location: text("location"),
  weight: decimal("weight", { precision: 10, scale: 2 }),
  dimensions: text("dimensions"),
  tags: text("tags").array(),
});

export const categoryRelation = relations(categoryTable, ({ many }) => ({
  inventory: many(inventoryTable),
}));
