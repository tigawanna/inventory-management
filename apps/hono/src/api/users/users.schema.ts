
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { usersTable } from "@/db/schema/users";
import { genericQueryParamsSchema } from "@/schemas/shared-schema";

export const usersSelectSchema = createSelectSchema(usersTable)
export const usersInsertSchema = createInsertSchema(usersTable);
export const usersUpdateSchema = createUpdateSchema(usersTable);



export type UsersItem = z.infer<typeof usersSelectSchema>;
export type updateUsers = z.infer<typeof usersUpdateSchema>;
export type createUsers = z.infer<typeof usersInsertSchema>;

const sortBy = ["created_at",] as const satisfies Array<keyof UsersItem>;

export const listUsersQueryParamsSchema = genericQueryParamsSchema.extend({
  sort: z.enum(sortBy).optional(),
});

export const viewUsersParamsSchema = z.object({
  id: z.string(),
});

export type listUsersQueryParams = z.infer<typeof listUsersQueryParamsSchema>;
export type viewUsersParams = z.infer<typeof viewUsersParamsSchema>;

