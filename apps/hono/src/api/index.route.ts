import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import { createRouter } from "@/lib/create-app";
import { baseResponseSchema } from "@/schemas/shared-schema";

const router = createRouter().openapi(
  createRoute({
    tags: ["Home"],
    method: "get",
    path: "/api/v1",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        baseResponseSchema.extend({
          result: z.object({
            message: z.string(),
          }),
          error: z.null().optional(),
        }),
        "Welcome to the Inventory API",
      ),
    },
  }),
  async (c) => {
    return c.json(
      {
        error: null,
        result: {
          message: "Welcome to the Inventory API",
        },
      },
      HttpStatusCodes.OK,
    );
  },
);

export default router;
