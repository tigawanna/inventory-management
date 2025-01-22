
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AuditlogsPage } from "@/routes/dashboard/auditlogs/-components/AuditlogsPage";
import { entityType,auditAction } from "./-components/filters";


const searchparams = z.object({
  page: z.number().optional(),
  sq: z.string().optional(),
  limit: z.number().optional(),
  entity: z.enum(entityType).optional(),
  action: z.enum(auditAction).optional(),
  order: z.enum(["asc", "desc"]).default("desc").optional(),
});

export const Route = createFileRoute("/dashboard/auditlogs/")({
  validateSearch: (search) => searchparams.parse(search),
  component:AuditlogsPage
});

