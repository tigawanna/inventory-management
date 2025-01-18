import { createRouter } from "@/lib/create-app";

import { inventoryCreateHandler, inventoryCreateRoute } from "./inventory.create";
import { inventoryDeleteHandler, inventoryDeleteRoute } from "./inventory.delete";
import { inventoryListHandler, inventoryListRoute } from "./inventory.list";
import { inventoryGetOneHandler, inventoryGetOneRoute } from "./inventory.one";
import { inventoryUpdateHandler, inventoryUpdateRoute } from "./inventory.update";

const router = createRouter()
  .openapi(inventoryListRoute, inventoryListHandler)
  .openapi(inventoryGetOneRoute, inventoryGetOneHandler)
  .openapi(inventoryCreateRoute, inventoryCreateHandler)
  .openapi(inventoryUpdateRoute, inventoryUpdateHandler)
  .openapi(inventoryDeleteRoute, inventoryDeleteHandler);

export default router;
