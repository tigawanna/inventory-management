
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { usersTable } from "@/db/schema/users";
import { genericQueryParamsSchema } from "@/schemas/shared-schema";

export const baseUserSelectSchema = createSelectSchema(usersTable)
export const usersSelectSchema = baseUserSelectSchema.omit({
  metadata: true
}).extend({
  metadata: z.record(z.string(), z.any()).optional(),
})
export const baseUsersInsertSchema = createInsertSchema(usersTable);
export const baseUpdateSchema = createUpdateSchema(usersTable);
export const usersInsertSchema = baseUsersInsertSchema.omit({
  metadata: true
}).extend({
  metadata: z.record(z.string(), z.any()).nullable(),
})
export const usersUpdateSchema = baseUpdateSchema.omit({
  metadata: true
}).extend({
  metadata: z.record(z.string(), z.any()).optional(),
})



export type UsersItem = z.infer<typeof usersSelectSchema>;
export type updateUsers = z.infer<typeof usersUpdateSchema>;
export type createUsers = z.infer<typeof usersInsertSchema>;

const sortBy = ["name", "email",] as const satisfies Array<keyof UsersItem>;

export const listUsersQueryParamsSchema = genericQueryParamsSchema.extend({
  sort: z.enum(sortBy).optional(),
});

export const viewUsersParamsSchema = z.object({
  id: z.string(),
});

export type listUsersQueryParams = z.infer<typeof listUsersQueryParamsSchema>;
export type viewUsersParams = z.infer<typeof viewUsersParamsSchema>;

