import { index, integer, pgTable, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { commonColumns } from "../helpers/columns";
import { productsTable } from "./products";
import { warehousesTable } from "./warehouses";

export const stockLevelsTable = pgTable(
  "stock_levels",
  {
    ...commonColumns,
    productId: integer("product_id")
      .references(() => productsTable.id)
      .notNull(),
    warehouseId: integer("warehouse_id")
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
