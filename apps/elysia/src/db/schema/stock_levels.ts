import { relations } from "drizzle-orm";
import { index, integer, pgTable, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";
import { productsTable } from "./products";
import { warehousesTable } from "./warehouses";

/**
 * Stock levels table - current inventory snapshot
 * Maintains real-time stock quantities for each product at each warehouse
 * Key fields:
 * - productId + warehouseId: composite unique key
 * - quantity: total available units
 * - reserved: units allocated but not yet shipped
 * - updatedAt: last modification timestamp
 * Indexes optimize product and warehouse-based queries
 */
export const stockLevelsTable = pgTable(
  "stock_levels",
  {
    ...commonColumns,
    productId: uuid("product_id")
      .references(() => productsTable.id)
      .notNull(),
    warehouseId: uuid("warehouse_id")
      .references(() => warehousesTable.id)
      .notNull(),
    quantity: integer("quantity").notNull().default(0),
    reserved: integer("reserved").notNull().default(0),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    uniqueIndex("stock_levels_product_warehouse_unique").on(
      table.productId,
      table.warehouseId
    ),
    index("stock_levels_product_idx").on(table.productId),
    index("stock_levels_warehouse_idx").on(table.warehouseId),
  ]
);

/**
 * Stock levels relations - current inventory quantities
 * - product: the product being tracked (many-to-one)
 * - warehouse: the warehouse where stock is located (many-to-one)
 * Composite unique constraint ensures one record per product+warehouse combination
 * Tracks available and reserved quantities
 */
export const stockLevelsRelations = relations(stockLevelsTable, ({ one }) => ({
  product: one(productsTable, {
    fields: [stockLevelsTable.productId],
    references: [productsTable.id],
  }),
  warehouse: one(warehousesTable, {
    fields: [stockLevelsTable.warehouseId],
    references: [warehousesTable.id],
  }),
}));
