import { createRoute } from "@hono/zod-openapi";
import { DrizzleError } from "drizzle-orm";
import { jsonContent } from "stoker/openapi/helpers";
import { z, ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { baseResponseSchema } from "@/schemas/shared-schema";

import type { InventoryItem } from "../../schemas/invemtory.schema";

import {
  inventorySelectSchema,
  inventoryUpdateSchema,
} from "../../schemas/invemtory.schema";
import { InventoryService } from "./inventory.service";

const tags = ["Inventory"];

export const inventoryUpdateRoute = createRoute({
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
          schema: inventoryUpdateSchema.extend({id:z.string()}),
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
      "Inventory update successful",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema,
      "Inventory update validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema,
      "Inventory update internal server error",
    ),
  },
});

export type UpdateInventoryRoute = typeof inventoryUpdateRoute;

const inventoryService = new InventoryService();
export const inventoryUpdateHandler: AppRouteHandler<UpdateInventoryRoute> =
  async (c) => {
    try {
      const newItem = c.req.valid("json");
      const inventory = await inventoryService.update(
        newItem.id,
        newItem
      ) as InventoryItem;
      return c.json({
        result: inventory,
        error: null,
      }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof ZodError) {
        c.var.logger.error("Inventory update  error:", error.message);
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
        c.var.logger.error("Inventory update  error:", error.name);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      if (error instanceof DrizzleError) {
        c.var.logger.error("Inventory update drizzle error:", error);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      c.var.logger.error("Inventory update  internal  error:", error);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: "Internal Server Error",
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
