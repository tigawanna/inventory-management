import { auditLogsTable } from "@/db/schema/users.ts";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";
import { genericQueryParamsSchema } from "./shared-schema.ts";


export const auditLogSelectSchema = createSelectSchema(auditLogsTable);
export const auditLogInsertSchema = createInsertSchema(auditLogsTable);
export const auditLogUpdateSchema = createUpdateSchema(auditLogsTable);


export type AuditLogItem = z.infer<typeof auditLogSelectSchema>;
export type UpdateAuditLogFields = z.infer<typeof auditLogUpdateSchema>;
export type CreateAuditLogFields = z.infer<typeof auditLogInsertSchema>;
export type ViewAuditLogParams = z.infer<typeof viewAuditLogParamsSchema>;
export type ListAuditLogQueryParams = z.infer<
  typeof listAuditLogQueryParamsSchema
>;



const sortBy = ["ipAddress", "action", "created_at"] as const satisfies Array<
  keyof AuditLogItem
>;
export const listAuditLogQueryParamsSchema = genericQueryParamsSchema.extend({
  sort: z.enum(sortBy).optional(),
});

export const viewAuditLogParamsSchema = z.object({
  id: z.string(),
});
