import { usersTable } from "@/db/schema/users";
import { genericQueryParamsSchema } from "@/shared/schema";
import { createSelectSchema, createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";


export const userSelectSchema = createSelectSchema(usersTable);
export const userInsertSchema = createInsertSchema(usersTable);
export const userUpdateSchema = createUpdateSchema(usersTable);

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
