import { relations } from "drizzle-orm";
import { boolean, pgTable, varchar } from "drizzle-orm/pg-core";
import { commonColumns } from "../helpers/columns";
import { inventoryTransactionsTable } from "./inventory_transactions";
import { stockLevelsTable } from "./stock_levels";

/**
 * Warehouses table - storage facility definitions
 * Tracks physical locations where inventory is stored
 * Key fields:
 * - name: unique warehouse identifier
 * - location: physical address or location description
 * - isActive: whether warehouse is currently operational
 * - notes: additional warehouse information (capacity, access, etc.)
 */
export const warehousesTable = pgTable("warehouses", {
  ...commonColumns,
  name: varchar("name", { length: 255 }).notNull().unique(),
  location: varchar("location", { length: 255 }),
  isActive: boolean("is_active").default(true),
  notes: varchar("notes", { length: 255 }),
});

/**
 * Warehouses relations - storage location definitions
 * - stockLevels: current stock quantities at this warehouse (one-to-many)
 * - sourceTransactions: inventory transactions moving stock OUT of this warehouse (one-to-many)
 * - targetTransactions: inventory transactions moving stock INTO this warehouse (one-to-many)
 * Enables tracking stock movements between warehouses
 */
export const warehousesRelations = relations(warehousesTable, ({ many }) => ({
  stockLevels: many(stockLevelsTable),
  sourceTransactions: many(inventoryTransactionsTable, { relationName: "source" }),
  targetTransactions: many(inventoryTransactionsTable, { relationName: "target" }),
}));
