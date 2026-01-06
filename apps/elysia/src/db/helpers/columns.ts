import { integer, timestamp } from "drizzle-orm/pg-core";

export const commonColumns = {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
};
