import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { usersTable } from "@/db/schema/users.ts";

export const userSelectSchema = createSelectSchema(usersTable);
export const userInsertSchema = createInsertSchema(usersTable);
export const userUpdateSchema = createUpdateSchema(usersTable);

export const userJWTSchema = userSelectSchema.omit({
  password: true,
  verificationToken: true,
  tokenVersion: true,
});
