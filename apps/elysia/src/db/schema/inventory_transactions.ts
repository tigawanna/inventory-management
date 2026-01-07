import { relations } from "drizzle-orm";
import { decimal, integer, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { commonColumns } from "../helpers/columns";
import { productsTable } from "./products";
import { usersTable } from "./users";
import { warehousesTable } from "./warehouses";

/**
 * Enum defining the types of inventory transactions
 * - PURCHASE: Stock coming into inventory from suppliers
 * - SALE: Stock leaving inventory to customers
 * - TRANSFER: Stock moving between warehouses
 * - ADJUSTMENT: Manual corrections to inventory levels
 */
export const transactionTypeEnum = pgEnum("transaction_type", [
  "PURCHASE",
  "SALE",
  "TRANSFER",
  "ADJUSTMENT",
]);

/**
 * Inventory transactions table - tracks all stock movements and changes
 * Records every purchase, sale, transfer, and adjustment for complete audit trail
 * Key fields:
 * - type: transaction category (purchase/sale/transfer/adjustment)
 * - productId: which product is being moved
 * - quantity: how many units (positive for additions, negative for removals)
 * - unitPrice: price per unit at time of transaction
 * - sourceWarehouseId: where stock is coming from (null for purchases)
 * - targetWarehouseId: where stock is going to (null for sales)
 * - referenceId: external reference (invoice number, order ID, etc.)
 * - performedByUserId: which user executed the transaction
 * - performedAt: timestamp of when transaction occurred
 */
export const inventoryTransactionsTable = pgTable("inventory_transactions", {
  ...commonColumns,
  type: transactionTypeEnum("type").notNull(),
  productId: uuid("product_id")
    .references(() => productsTable.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }),
  sourceWarehouseId: uuid("source_warehouse_id").references(() => warehousesTable.id),
  targetWarehouseId: uuid("target_warehouse_id").references(() => warehousesTable.id),
  referenceId: varchar("reference_id", { length: 128 }),
  note: varchar("note", { length: 255 }),
  performedByUserId: uuid("performed_by_user_id").references(() => usersTable.id),
  performedAt: timestamp("performed_at").defaultNow(),
});

/**
 * Inventory transactions relations - audit trail of all stock movements
 * - product: the product being moved (many-to-one)
 * - sourceWarehouse: origin warehouse (nullable for purchases) (many-to-one)
 * - targetWarehouse: destination warehouse (nullable for sales) (many-to-one)
 * - performedBy: the user who executed this transaction (many-to-one)
 * Supports transaction types: PURCHASE, SALE, TRANSFER, ADJUSTMENT
 * Critical for inventory audit trail and analytics
 */
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
      relationName: "source",
    }),
    targetWarehouse: one(warehousesTable, {
      fields: [inventoryTransactionsTable.targetWarehouseId],
      references: [warehousesTable.id],
      relationName: "target",
    }),
    performedBy: one(usersTable, {
      fields: [inventoryTransactionsTable.performedByUserId],
      references: [usersTable.id],
    }),
  })
);
