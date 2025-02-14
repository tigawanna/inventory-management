import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";

import { auditAction, auditLogsTable, entityType } from "@/db/schema/auditlogs";
import { genericQueryParamsSchema } from "@/schemas/shared-schema";

export const brokenauditlogsSelectSchema = createSelectSchema(auditLogsTable);
export const auditlogsInsertSchema = createInsertSchema(auditLogsTable);
export const auditlogsUpdateSchema = createUpdateSchema(auditLogsTable);

export const auditlogsSelectSchema = brokenauditlogsSelectSchema.omit({
  oldData: true,
  newData: true,
}).extend({
  oldData: z.record(z.string(), z.any()).nullable().nullable(),
  newData: z.record(z.string(), z.any()).nullable().nullable(),
})
// this will be used as the new select schema as the drizzle zod one causes infinte type error
// export const auditlogsSelectSchema = z.object({
//   id: z.string(),
//   userId: z.nullable(z.string()),
//   action: z.string(),
//   entityType: z.string(),
//   entityId: z.string(),
//   oldData: z.any().nullable(),
//   newData: z.any().nullable(),
//   ipAddress: z.nullable(z.string()),
//   updated_at: z.nullable(z.date()),
//   created_at: z.nullable(z.date()),
// });

export type AuditlogsItem = z.infer<typeof auditlogsSelectSchema>;
export type updateAuditlogs = z.infer<typeof auditlogsUpdateSchema>;
export type createAuditlogs = z.infer<typeof auditlogsInsertSchema>;

const sortBy = ["created_at"] as const satisfies Array<keyof AuditlogsItem>;

export const listAuditlogsQueryParamsSchema = genericQueryParamsSchema.extend({
  sort: z.enum(sortBy).optional(),
  // entity: z.string().optional(),
  // action: z.string().optional(),
  entity: z.enum(entityType).optional(),
  action: z.enum(auditAction).optional(),
});

export const viewAuditlogsParamsSchema = z.object({
  id: z.string(),
});

export type listAuditlogsQueryParams = z.infer<
  typeof listAuditlogsQueryParamsSchema
>;
export type viewAuditlogsParams = z.infer<typeof viewAuditlogsParamsSchema>;
