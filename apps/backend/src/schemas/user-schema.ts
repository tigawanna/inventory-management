import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { usersTable } from "@/db/schema/users.ts";
import type { z } from "zod";

export const userSelectSchema = createSelectSchema(usersTable);
export const userInsertSchema = createInsertSchema(usersTable);
export const userUpdateSchema = createUpdateSchema(usersTable);

export const userJWTSchema = userSelectSchema.omit({
  password: true,
  verificationToken: true,
  refreshToken: true,
});

export type UserJWTPayload = z.infer<typeof userJWTSchema>;


