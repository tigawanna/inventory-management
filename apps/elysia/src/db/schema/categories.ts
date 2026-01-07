import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { commonColumns } from "../helpers/columns";
import { productsTable } from "./products";

/**
 * Categories table - product classification system
 * Organizes products into hierarchical groups for navigation and reporting
 * Key fields:
 * - name: unique category name
 * - description: optional category details
 */
export const categoriesTable = pgTable("categories", {
  ...commonColumns,
  name: varchar("name", { length: 128 }).notNull().unique(),
  description: varchar("description", { length: 255 }),
});

/**
 * Categories relations - product category definitions
 * - products: all products belonging to this category (one-to-many)
 * Used for product organization and filtering
 */
export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
  products: many(productsTable),
}));
