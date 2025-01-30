
import { createFileRoute } from "@tanstack/react-router";
import { AuditlogsPage } from "@/routes/dashboard/auditlogs/-components/AuditlogsPage";
import { getApiAuditlogsQueryParamsSchema } from "@/lib/kubb/gen";


// const searchparams = z.object({
//   page: z.number().optional(),
//   sq: z.string().optional(),
//   limit: z.number().optional(),
//   action: z.enum(auditAction).optional(),
//   order: z.enum(["asc", "desc"]).default("desc").optional(),
// });
const searchparams = getApiAuditlogsQueryParamsSchema

export const Route = createFileRoute("/dashboard/auditlogs/")({
  validateSearch: (search) => searchparams.parse(search),
  component:AuditlogsPage
});

