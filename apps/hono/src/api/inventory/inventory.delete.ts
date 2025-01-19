import { createRoute } from "@hono/zod-openapi";
import { DrizzleError } from "drizzle-orm";
import { jsonContent } from "stoker/openapi/helpers";
import { z, ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { baseResponseSchema } from "@/schemas/shared-schema";

import type { InventoryItem } from "./invemtory.schema";

import { InventoryService } from "./inventory.service";

const tags = ["Inventory"];

export const inventoryDeleteRoute = createRoute({
  path: "/",
  method: "delete",
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
          schema: z.object({
            id: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      baseResponseSchema.extend({
        result: z.object({
          message: z.string(),
        }),
        error: z.null().optional(),
      }),
      "Inventory deletion successful",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      baseResponseSchema,
      "Inventory deletion not found error",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema,
      "Inventory deletion validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema,
      "Inventory deletion internal server error",
    ),
  },
});

export type UpdateInventoryRoute = typeof inventoryDeleteRoute;

const inventoryService = new InventoryService();
export const inventoryDeleteHandler: AppRouteHandler<UpdateInventoryRoute>
  = async (c) => {
    try {
      const newItem = c.req.valid("json");
      const deletedItem = await inventoryService.delete(
        newItem.id,
      ) as InventoryItem;
      if (!deletedItem) {
        return c.json({
          result: null,
          error: {
            message: "Entry not found",
          },
        }, HttpStatusCodes.NOT_FOUND);
      }
      return c.json({
        result: {
          message: "successfully deleted",
        },
        error: null,
      }, HttpStatusCodes.OK);
    }
    catch (error) {
      if (error instanceof ZodError) {
        c.var.logger.error("Inventory deletion  error:", error.message);
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
        c.var.logger.error("Inventory deletion  error:", error.name);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      if (error instanceof DrizzleError) {
        c.var.logger.error("Inventory deletion drizzle error:", error);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      c.var.logger.error("Inventory deletion  internal  error:", error);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: "Internal Server Error",
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
