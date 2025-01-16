import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";
import { createRouter } from "@/lib/create-app";
import { getCurrentContext } from "@/middlewares/context-middleware";
import { getConnInfo } from "@hono/node-server/conninfo";
const router = createRouter().openapi(
  createRoute({
    tags: ["Index"],
    method: "get",
    path: "/",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Welcome"),
        "Welcome to  the invemtpry api"
      ),
    },
  }),
  async (c) => {
    return c.json(
      {
        message: "Welcome to the Inventory API",
      },
      HttpStatusCodes.OK
    );
  }
);

export default router;
