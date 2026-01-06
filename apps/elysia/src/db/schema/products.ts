import { boolean, decimal, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { commonColumns } from "../helpers/columns";
import { categoriesTable } from "./categories";
import { suppliersTable } from "./suppliers";

export const productsTable = pgTable("products", {
  ...commonColumns,
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  sku: varchar("sku", { length: 64 }).notNull().unique(),
  categoryId: integer("category_id").references(() => categoriesTable.id),
  supplierId: integer("supplier_id").references(() => suppliersTable.id),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  reorderLevel: integer("reorder_level").default(0),
  isActive: boolean("is_active").default(true),
});

export const productsRelations = relations(productsTable, ({ one }) => ({
  category: one(categoriesTable, {
    fields: [productsTable.categoryId],
    references: [categoriesTable.id],
  }),
  supplier: one(suppliersTable, {
    fields: [productsTable.supplierId],
    references: [suppliersTable.id],
  }),
}));
