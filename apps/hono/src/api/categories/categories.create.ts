
import { createRoute } from "@hono/zod-openapi";
import { DrizzleError } from "drizzle-orm";
import { jsonContent } from "stoker/openapi/helpers";
import { z, ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { baseResponseSchema } from "@/schemas/shared-schema";

import type {
  CategoriesItem,
} from "./categories.schema";

import {
  categoriesInsertSchema,
  categoriesSelectSchema,
} from "./categories.schema";
import { CategoriesService } from "./categories.service";

const tags = ["Categories"];

export const categoriesCreateRoute = createRoute({
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
          schema: categoriesInsertSchema,
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
      "Categories creation successful",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema,
      "Categories creation validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema,
      "Categories creation internal server error",
    ),
  },
});

export type CreateCategoriesRoute = typeof categoriesCreateRoute;

const categoriesService = new CategoriesService();
export const categoriesCreateHandler: AppRouteHandler<CreateCategoriesRoute> = async (c) => {
  try {
    const categories = await categoriesService.create(c.req.valid("json")) as CategoriesItem;
    return c.json({
      result: categories,
      error: null,
    }, HttpStatusCodes.OK);
  }
  catch (error) {
    if (error instanceof ZodError) {
      c.var.logger.error("Categories creation  error:", error.message);
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
      c.var.logger.error("Categories creation  error:", error);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    if (error instanceof DrizzleError) {
      c.var.logger.error("Categories creation drizzle error:", error);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    c.var.logger.error("Categories creation  internal  error:", error);
    return c.json({
      result: null,
      error: {
        code: "internal-server-error",
        message: "Internal Server Error",
      } as const,
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

    