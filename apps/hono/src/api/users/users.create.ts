
import { createRoute } from "@hono/zod-openapi";
import { DrizzleError } from "drizzle-orm";
import { jsonContent } from "stoker/openapi/helpers";
import { z, ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { baseResponseSchema } from "@/schemas/shared-schema";

import type {
  UsersItem,
} from "./users.schema";

import {
  usersInsertSchema,
  usersSelectSchema,
} from "./users.schema";
import { UsersService } from "./users.service";

const tags = ["Users"];

export const usersCreateRoute = createRoute({
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
          schema: usersInsertSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      baseResponseSchema.extend({
        result: usersSelectSchema,
        error: z.null().optional(),
      }),
      "Users creation successful",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema,
      "Users creation validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema,
      "Users creation internal server error",
    ),
  },
});

export type CreateUsersRoute = typeof usersCreateRoute;

const usersService = new UsersService();
export const usersCreateHandler: AppRouteHandler<CreateUsersRoute> = async (c) => {
  try {
    const users = await usersService.create(c.req.valid("json")) as UsersItem;
    return c.json({
      result: users,
      error: null,
    }, HttpStatusCodes.OK);
  }
  catch (error) {
    if (error instanceof ZodError) {
      c.var.logger.error("Users creation  error:", error.message);
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
      c.var.logger.error("Users creation  error:", error.name);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    if (error instanceof DrizzleError) {
      c.var.logger.error("Users creation drizzle error:", error);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    c.var.logger.error("Users creation  internal  error:", error);
    return c.json({
      result: null,
      error: {
        code: "internal-server-error",
        message: "Internal Server Error",
      } as const,
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

    