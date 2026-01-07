import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { commonColumns } from "../helpers/columns";
import { productsTable } from "./products";

/**
 * Suppliers table - vendor/supplier directory
 * Maintains contact information and details for product suppliers
 * Key fields:
 * - name: unique supplier/vendor name
 * - email, phone: primary contact methods
 * - address: physical location
 * - contactPerson: primary contact name at the supplier
 * - notes: additional supplier information or terms
 */
export const suppliersTable = pgTable("suppliers", {
  ...commonColumns,
  name: varchar("name", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 64 }),
  address: varchar("address", { length: 255 }),
  contactPerson: varchar("contact_person", { length: 255 }),
  notes: varchar("notes", { length: 255 }),
});

/**
 * Suppliers relations - supplier/vendor information
 * - products: all products supplied by this vendor (one-to-many)
 * Used for supplier management and procurement queries
 */
export const suppliersRelations = relations(suppliersTable, ({ many }) => ({
  products: many(productsTable),
}));
