import { relations } from "drizzle-orm";
import { boolean, decimal, integer, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";
import { categoriesTable } from "./categories";
import { inventoryTransactionsTable } from "./inventory_transactions";
import { stockLevelsTable } from "./stock_levels";
import { suppliersTable } from "./suppliers";

/**
 * Products table - master product catalog
 * Stores core product information including pricing, SKU, and relationships
 * Key fields:
 * - name: product display name
 * - sku: unique stock keeping unit identifier
 * - categoryId: optional category classification
 * - supplierId: primary supplier reference
 * - price: current selling price
 * - reorderLevel: minimum stock threshold for reorder alerts
 * - isActive: soft delete flag for discontinued products
 */
export const productsTable = pgTable("products", {
  ...commonColumns,
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }),
  sku: varchar("sku", { length: 64 }).notNull().unique(),
  categoryId: uuid("category_id").references(() => categoriesTable.id),
  supplierId: uuid("supplier_id").references(() => suppliersTable.id),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  reorderLevel: integer("reorder_level").default(0),
  isActive: boolean("is_active").default(true),
});

/**
 * Products relations - product catalog definitions
 * - category: the category this product belongs to (many-to-one)
 * - supplier: the primary supplier for this product (many-to-one)
 * - stockLevels: current stock quantities across all warehouses (one-to-many)
 * - transactions: all inventory transactions involving this product (one-to-many)
 * Central entity for inventory management queries
 */
export const productsRelations = relations(productsTable, ({ one, many }) => ({
  category: one(categoriesTable, {
    fields: [productsTable.categoryId],
    references: [categoriesTable.id],
  }),
  supplier: one(suppliersTable, {
    fields: [productsTable.supplierId],
    references: [suppliersTable.id],
  }),
  stockLevels: many(stockLevelsTable),
  transactions: many(inventoryTransactionsTable),
}));
