import { createRouter } from "@/lib/create-app";

import { auditlogsListHandler, auditlogsListRoute } from "./auditlogs.list";
import { auditlogsGetOneHandler, auditlogsGetOneRoute } from "./auditlogs.one";

const router = createRouter()
  .openapi(auditlogsListRoute, auditlogsListHandler)
  .openapi(auditlogsGetOneRoute, auditlogsGetOneHandler);

export default router;
