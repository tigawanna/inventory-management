
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { helloTable } from "@/db/schema/hello";
import { genericQueryParamsSchema } from "@/schemas/shared-schema";

export const helloSelectSchema = createSelectSchema(helloTable);
export const helloInsertSchema = createInsertSchema(helloTable);
export const helloUpdateSchema = createUpdateSchema(helloTable);

export type HelloItem = z.infer<typeof helloSelectSchema>;
export type updateHello = z.infer<typeof helloUpdateSchema>;
export type createHello = z.infer<typeof helloInsertSchema>;

const sortBy = ["created_at",] as const satisfies Array<keyof HelloItem>;

export const listHelloQueryParamsSchema = genericQueryParamsSchema.extend({
  sort: z.enum(sortBy).optional(),
});

export const viewHelloParamsSchema = z.object({
  id: z.string(),
});

export type listHelloQueryParams = z.infer<typeof listHelloQueryParamsSchema>;
export type viewHelloParams = z.infer<typeof viewHelloParamsSchema>;

