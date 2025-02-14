import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { usersTable } from "@/db/schema/users";
import { genericQueryParamsSchema } from "@/schemas/shared-schema";

export const baseUserSelectSchema = createSelectSchema(usersTable);
export const userSelectSchema = baseUserSelectSchema.omit({
  metadata: true,
}).extend({
  metadata: z.record(z.string(), z.any()).nullable(),
});
export const userInsertSchema = createInsertSchema(usersTable);
export const baseUserUpdateSchema = createUpdateSchema(usersTable);
export const userUpdateSchema = baseUserUpdateSchema.omit({
  metadata: true,
}).extend({
  metadata: z.record(z.string(), z.any()).optional(),
});

export const userJWTSchema = userSelectSchema.omit({
  password: true,
  verificationToken: true,
  refreshToken: true,
});

export const createNewUserSchema = userInsertSchema.pick({
  name: true,
  email: true,
  password: true,
  verificationToken: true,
});
export type CreateNewUserSchema = z.infer<typeof createNewUserSchema>;
export type UserJWTPayload = z.infer<typeof userJWTSchema>;

export type UserItem = z.infer<typeof userSelectSchema>;
export type UpdateUserFields = z.infer<typeof userUpdateSchema>;
export type CreateUserFields = z.infer<typeof userInsertSchema>;
export type ViewUserParams = z.infer<typeof viewUserParamsSchema>;

const sortBy = ["name", "email", "created_at"] as const satisfies Array<keyof UserItem>;
export const listUserQueryParamsSchema = genericQueryParamsSchema.extend({
  sort: z.enum(sortBy).optional(),
});

export const viewUserParamsSchema = z.object({
  id: z.string(),
});
export type ListUserQueryParams = z.infer<typeof listUserQueryParamsSchema>;
