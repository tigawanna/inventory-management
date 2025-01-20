
import { createRoute } from "@hono/zod-openapi";
import { DrizzleError } from "drizzle-orm";
import { jsonContent } from "stoker/openapi/helpers";
import { z, ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { baseResponseSchema } from "@/schemas/shared-schema";

import type { UsersItem } from "./users.schema";

import {
  usersSelectSchema,
  usersUpdateSchema,
} from "./users.schema";
import { UsersService } from "./users.service";

const tags = ["Users"];

export const usersUpdateRoute = createRoute({
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
          schema: usersUpdateSchema.extend({id:z.string()}),
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
      "Users update successful",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema,
      "Users update validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema,
      "Users update internal server error",
    ),
  },
});

export type UpdateUsersRoute = typeof usersUpdateRoute;

const usersService = new UsersService();
export const usersUpdateHandler: AppRouteHandler<UpdateUsersRoute> =
  async (c) => {
    try {
      const newItem = c.req.valid("json");
      const users = await usersService.update(
        newItem.id,
        newItem
      ) as UsersItem;
      return c.json({
        result: users,
        error: null,
      }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof ZodError) {
        c.var.logger.error("Users update  error:", error.message);
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
        c.var.logger.error("Users update  error:", error.name);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      if (error instanceof DrizzleError) {
        c.var.logger.error("Users update drizzle error:", error);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      c.var.logger.error("Users update  internal  error:", error);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: "Internal Server Error",
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  };


    