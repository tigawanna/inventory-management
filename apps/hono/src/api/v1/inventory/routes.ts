import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";

import HttpStatusCodes from "@/lib/status-codes";
import { baseListResponseSchema } from "@/shared/schema";

import {
  inventorySelectSchema,
  listInventoryQueryParamsSchema,
} from "./schema";

const tags = ["Inventory"];

export const list = createRoute({
  path: "/inventory",
  method: "get",
  tags,
  request: {
    query: listInventoryQueryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      baseListResponseSchema.extend({ items: z.array(inventorySelectSchema) }),
      "The inventory list",
    ),
  },
});

export type ListRoute = typeof list;
// export type CreateRoute = typeof create;
// export type GetOneRoute = typeof getOne;
// export type PatchRoute = typeof patch;
// export type RemoveRoute = typeof remove;
