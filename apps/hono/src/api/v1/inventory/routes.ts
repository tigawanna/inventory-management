import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";

import HttpStatusCodes from "@/lib/status-codes";

import { inventorySelectSchema } from "./schema";

const tags = ["Inventory"];

export const list = createRoute({
  path: "/inventory",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(inventorySelectSchema), "The inventory list"),
  },
});

export type ListRoute = typeof list;
// export type CreateRoute = typeof create;
// export type GetOneRoute = typeof getOne;
// export type PatchRoute = typeof patch;
// export type RemoveRoute = typeof remove;
