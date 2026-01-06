import { decimal, integer, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { commonColumns } from "../helpers/columns";
import { productsTable } from "./products";
import { usersTable } from "./users";
import { warehousesTable } from "./warehouses";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "PURCHASE",
  "SALE",
  "TRANSFER",
  "ADJUSTMENT",
]);

export const inventoryTransactionsTable = pgTable("inventory_transactions", {
  ...commonColumns,
  type: transactionTypeEnum("type").notNull(),
  productId: integer("product_id")
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }),
  sourceWarehouseId: integer("source_warehouse_id").references(() => warehousesTable.id),
  targetWarehouseId: integer("target_warehouse_id").references(() => warehousesTable.id),
  referenceId: varchar("reference_id", { length: 128 }),
  note: varchar("note", { length: 255 }),
  performedByUserId: integer("performed_by_user_id").references(() => usersTable.id),
  performedAt: timestamp("performed_at").defaultNow(),
});

export const inventoryTransactionsRelations = relations(
  inventoryTransactionsTable,
  ({ one }) => ({
    product: one(productsTable, {
      fields: [inventoryTransactionsTable.productId],
      references: [productsTable.id],
    }),
    sourceWarehouse: one(warehousesTable, {
      fields: [inventoryTransactionsTable.sourceWarehouseId],
      references: [warehousesTable.id],
    }),
    targetWarehouse: one(warehousesTable, {
      fields: [inventoryTransactionsTable.targetWarehouseId],
      references: [warehousesTable.id],
    }),
    performedBy: one(usersTable, {
      fields: [inventoryTransactionsTable.performedByUserId],
      references: [usersTable.id],
    }),
  })
);
