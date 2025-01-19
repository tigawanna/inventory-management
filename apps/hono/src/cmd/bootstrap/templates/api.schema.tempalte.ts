import { capitalizeFirstLetter } from "@/cmd/utils/string";

interface ApiSchemaTemplateProps {
  routename: string;
}
export function apiSchemaTemplate({routename}: ApiSchemaTemplateProps) {
const capitalizedRoutename = capitalizeFirstLetter(routename); 
  return `
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { ${routename}Table } from "@/db/schema/${routename}";
import { genericQueryParamsSchema } from "@/schemas/shared-schema";

export const ${routename}SelectSchema = createSelectSchema(${routename}Table);
export const ${routename}InsertSchema = createInsertSchema(${routename}Table);
export const ${routename}UpdateSchema = createUpdateSchema(${routename}Table);

export type ${capitalizedRoutename}Item = z.infer<typeof ${routename}SelectSchema>;
export type update${capitalizedRoutename} = z.infer<typeof ${routename}UpdateSchema>;
export type create${capitalizedRoutename} = z.infer<typeof ${routename}InsertSchema>;

const sortBy = ["created_at",] as const satisfies Array<keyof ${capitalizedRoutename}Item>;

export const list${capitalizedRoutename}QueryParamsSchema = genericQueryParamsSchema.extend({
  sort: z.enum(sortBy).optional(),
});

export const view${capitalizedRoutename}ParamsSchema = z.object({
  id: z.string(),
});

export type list${capitalizedRoutename}QueryParams = z.infer<typeof list${capitalizedRoutename}QueryParamsSchema>;
export type view${capitalizedRoutename}Params = z.infer<typeof view${capitalizedRoutename}ParamsSchema>;

`;
}
