import { auditLogsTable } from "@/db/schema/auditlogs";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { genericQueryParamsSchema } from "@/schemas/shared-schema";

export const auditlogsSelectSchema = createSelectSchema(auditLogsTable);
export const auditlogsInsertSchema = createInsertSchema(auditLogsTable);
export const auditlogsUpdateSchema = createUpdateSchema(auditLogsTable);

export type AuditlogsItem = z.infer<typeof auditlogsSelectSchema>;
export type updateAuditlogs = z.infer<typeof auditlogsUpdateSchema>;
export type createAuditlogs = z.infer<typeof auditlogsInsertSchema>;

const sortBy = ["created_at"] as const satisfies Array<keyof AuditlogsItem>;

export const listAuditlogsQueryParamsSchema = genericQueryParamsSchema.extend({
  sort: z.enum(sortBy).optional(),
});

export const viewAuditlogsParamsSchema = z.object({
  id: z.string(),
});

export type listAuditlogsQueryParams = z.infer<typeof listAuditlogsQueryParamsSchema>;
export type viewAuditlogsParams = z.infer<typeof viewAuditlogsParamsSchema>;
