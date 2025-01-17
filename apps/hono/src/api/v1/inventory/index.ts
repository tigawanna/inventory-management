import { createRouter } from "@/lib/create-app";

import { inventoryListHandler, inventoryListRoute } from "./list";

const router = createRouter()
  .openapi(inventoryListRoute, inventoryListHandler);

export default router;
