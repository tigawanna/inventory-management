import { createRoute } from "@hono/zod-openapi";
import { DrizzleError } from "drizzle-orm";
import { jsonContent } from "stoker/openapi/helpers";
import { z, ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { baseResponseSchema } from "@/schemas/shared-schema";

import type {
  InventoryItem,
} from "../../schemas/invemtory.schema";

import {
  inventoryInsertSchema,
  inventorySelectSchema,
} from "../../schemas/invemtory.schema";
import { InventoryService } from "./inventory.service";

const tags = ["Inventory"];

export const inventoryCreateRoute = createRoute({
  path: "/",
  method: "post",
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
          schema: inventoryInsertSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      baseResponseSchema.extend({
        result: inventorySelectSchema,
        error: z.null().optional(),
      }),
      "The inventory creation",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema,
      "The inventory creation validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema,
      "The inventory creation internal server error",
    ),
  },
});

export type ListRoute = typeof inventoryCreateRoute;

const inventoryService = new InventoryService();
export const inventoryCreateHandler: AppRouteHandler<ListRoute> = async (c) => {
  try {
    const inventory = await inventoryService.create(c.req.valid("json")) as InventoryItem;
    return c.json({
      result: inventory,
      error: null,
    }, HttpStatusCodes.OK);
  }
  catch (error) {
    if (error instanceof ZodError) {
      c.var.logger.error("list inventory error:", error.message);
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
      c.var.logger.error("list internal inventory error:", error.name);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    if (error instanceof DrizzleError) {
      c.var.logger.error("drizzle create inventory error:", error);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    c.var.logger.error("internal create inventory error:", error);
    return c.json({
      result: null,
      error: {
        code: "internal-server-error",
        message: "Internal Server Error",
      } as const,
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
