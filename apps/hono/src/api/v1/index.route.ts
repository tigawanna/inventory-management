import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import { createRouter } from "@/lib/create-app";

const router = createRouter().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/api/v1",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Welcome"),
        "Welcome to  the V1 of invemtpry api",
      ),
    },
  }),
  async (c) => {
    return c.json(
      {
        message: "Welcome to the Inventory API",
      },
      HttpStatusCodes.OK,
    );
  },
);

export default router;
