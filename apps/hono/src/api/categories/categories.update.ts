
import { createRoute } from "@hono/zod-openapi";
import { DrizzleError } from "drizzle-orm";
import { jsonContent } from "stoker/openapi/helpers";
import { z, ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { baseResponseSchema } from "@/schemas/shared-schema";

import type { CategoriesItem } from "./categories.schema";

import {
  categoriesSelectSchema,
  categoriesUpdateSchema,
} from "./categories.schema";
import { CategoriesService } from "./categories.service";

const tags = ["Categories"];

export const categoriesUpdateRoute = createRoute({
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
          schema: categoriesUpdateSchema.extend({id:z.string()}),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      baseResponseSchema.extend({
        result: categoriesSelectSchema,
        error: z.null().optional(),
      }),
      "Categories update successful",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema,
      "Categories update validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema,
      "Categories update internal server error",
    ),
  },
});

export type UpdateCategoriesRoute = typeof categoriesUpdateRoute;

const categoriesService = new CategoriesService();
export const categoriesUpdateHandler: AppRouteHandler<UpdateCategoriesRoute> =
  async (c) => {
    try {
      const newItem = c.req.valid("json");
      const categories = await categoriesService.update(
        newItem.id,
        newItem
      ) as CategoriesItem;
      return c.json({
        result: categories,
        error: null,
      }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof ZodError) {
        c.var.logger.error("Categories update  error:", error.message);
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
        c.var.logger.error("Categories update  error:", error.name);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      if (error instanceof DrizzleError) {
        c.var.logger.error("Categories update drizzle error:", error);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      c.var.logger.error("Categories update  internal  error:", error);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: "Internal Server Error",
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  };


    