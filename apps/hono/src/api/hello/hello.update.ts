
import { createRoute } from "@hono/zod-openapi";
import { DrizzleError } from "drizzle-orm";
import { jsonContent } from "stoker/openapi/helpers";
import { z, ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { baseResponseSchema } from "@/schemas/shared-schema";

import type { HelloItem } from "./hello.schema";

import {
  helloSelectSchema,
  helloUpdateSchema,
} from "./hello.schema";
import { HelloService } from "./hello.service";

const tags = ["Hello"];

export const helloUpdateRoute = createRoute({
  path: "/",
  method: "patch",
  tags,
  request: {
    headers: z.object({
      Authorization: z.string().optional().openapi({
        description: "Bearer token required if no access token cookie is set",
      }),
    }),
    body: {
      content: {
        "application/json": {
          schema: helloUpdateSchema.extend({id:z.string()}),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      baseResponseSchema.extend({
        result: helloSelectSchema,
        error: z.null().optional(),
      }),
      "Hello update successful",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema,
      "Hello update validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema,
      "Hello update internal server error",
    ),
  },
});

export type UpdateHelloRoute = typeof helloUpdateRoute;

const helloService = new HelloService();
export const helloUpdateHandler: AppRouteHandler<UpdateHelloRoute> =
  async (c) => {
    try {
      const newItem = c.req.valid("json");
      const hello = await helloService.update(
        newItem.id,
        newItem
      ) as HelloItem;
      return c.json({
        result: hello,
        error: null,
      }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof ZodError) {
        c.var.logger.error("Hello update  error:", error.message);
        return c.json({
          result: null,
          error: {
            code: "parameters-required",
            message: error.message,
            data: returnValidationData(error),
          } as const,
        }, HttpStatusCodes.BAD_REQUEST);
      }
      if (error instanceof Error) {
        c.var.logger.error("Hello update  error:", error.name);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      if (error instanceof DrizzleError) {
        c.var.logger.error("Hello update drizzle error:", error);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      c.var.logger.error("Hello update  internal  error:", error);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: "Internal Server Error",
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  };


    