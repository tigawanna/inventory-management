import { createRouter } from "@/lib/create-app";

import { inventoryCreateHandler, inventoryCreateRoute } from "./inventory.create";
import { inventoryListHandler, inventoryListRoute } from "./inventory.list";

const router = createRouter()
  .openapi(inventoryListRoute, inventoryListHandler)
  .openapi(inventoryCreateRoute, inventoryCreateHandler);

export default router;
