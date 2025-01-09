
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { AuditlogsPage } from "@/routes/dashboard/auditlogs/-components/AuditlogsPage";

const searchparams = z.object({
  page: z.number().optional(),
  sq: z.string().optional(),
});

export const Route = createFileRoute("/dashboard/auditlogs/")({
  validateSearch: (search) => searchparams.parse(search),
  component:AuditlogsPage
});

