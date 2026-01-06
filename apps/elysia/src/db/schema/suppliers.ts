import { pgTable, varchar } from "drizzle-orm/pg-core";
import { commonColumns } from "../helpers/columns";

export const suppliersTable = pgTable("suppliers", {
  ...commonColumns,
  name: varchar("name", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 64 }),
  address: varchar("address", { length: 255 }),
  contactPerson: varchar("contact_person", { length: 255 }),
  notes: varchar("notes", { length: 255 }),
});
