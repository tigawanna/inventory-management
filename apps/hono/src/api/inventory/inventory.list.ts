import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { z, ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { baseListResponseSchema, baseResponseSchema } from "@/schemas/shared-schema";

import {
  inventorySelectSchema,
  listInventoryQueryParamsSchema,
} from "./invemtory.schema";
import { InventoryService } from "./inventory.service";

const tags = ["Inventory"];

export const inventoryListRoute = createRoute({
  path: "/",
  method: "get",
  tags,
  request: {
    query: listInventoryQueryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      baseResponseSchema.extend({ 
        result: baseListResponseSchema.extend({ items: z.array(inventorySelectSchema) }),
        error:z.null().optional(),
      })
      ,
      "Inventpry listing success",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema
      ,
      "Inventpry listing validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema
      ,
      "Inventpry listing internal server error",
    ),
  },
});

export type ListRoute = typeof inventoryListRoute;

const inventoryService = new InventoryService();
export const inventoryListHandler: AppRouteHandler<ListRoute> = async (c) => {
  try {
    const inventory = await inventoryService.findAll(c.req.valid("query"));
    return c.json({
      result: inventory,
      error: null,
    }, HttpStatusCodes.OK);
  }
  catch (error) {
    if (error instanceof ZodError) {
      c.var.logger.error("Inventpry listing error:", error.message);
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
      c.var.logger.error("Inventpry listing internal error:", error.name);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    c.var.logger.error("Inventpry listing internal  error:", error);
    return c.json({
      result: null,
      error: {
        code: "internal-server-error",
        message: "Internal Server Error",
      } as const,
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
