import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { usersTable } from "@/db/schema/users";
import { genericQueryParamsSchema } from "@/schemas/shared-schema";

export const baseUserSelectSchema = createSelectSchema(usersTable);
export const userSelectSchema = baseUserSelectSchema.omit({
  metadata: true
}).extend({
  metadata: z.record(z.string(), z.any()).nullable(),
})
export const userInsertSchema = createInsertSchema(usersTable);
export const userUpdateSchema = createUpdateSchema(usersTable);

export const userSignupSchema = userInsertSchema.pick({
  name: true,
  email: true,
  password: true,
})
export const userSigninSchema = userInsertSchema.pick({
  email: true,
  password: true
}).extend({
  email: z.string().email()
})
export const userJWTSchema = userSelectSchema.omit({
  password: true,
  verificationToken: true,
  refreshToken: true,
});


export type UserJWTPayload = z.infer<typeof userJWTSchema>;
export type UserSignupSchema = z.infer<typeof userSignupSchema>;
export type UserSigninSchema = z.infer<typeof userSigninSchema>;

export type UserItem = z.infer<typeof userSelectSchema>;
export type UpdateUserFields = z.infer<typeof userUpdateSchema>;
export type SignupUserFields = z.infer<typeof userInsertSchema>;
export type SigninUserFields = z.infer<typeof userInsertSchema>;
export type ViewUserParams = z.infer<typeof viewUserParamsSchema>;

const sortBy = ["name", "email", "created_at"] as const satisfies Array<
  keyof UserItem
>;
export const listUserQueryParamsSchema = genericQueryParamsSchema.extend({
  sort: z.enum(sortBy).optional(),
});

export const viewUserParamsSchema = z.object({
  id: z.string(),
});
export type ListUserQueryParams = z.infer<typeof listUserQueryParamsSchema>;
