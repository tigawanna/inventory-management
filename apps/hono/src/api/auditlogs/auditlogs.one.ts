import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { z, ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { userSelectSchema } from "@/schemas/auth.schema";
import { baseResponseSchema } from "@/schemas/shared-schema";

import {
  auditlogsSelectSchema,
} from "./auditlogs.schema";
import { AuditlogsService } from "./auditlogs.service";

const tags = ["Auditlogs"];

export const auditlogsGetOneRoute = createRoute({
  path: "/:id",
  method: "get",
  tags,
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      baseResponseSchema.extend({
        result: auditlogsSelectSchema.extend({
          user: userSelectSchema.pick({
            name: true,
            email: true,
            avatarUrl: true,
            role: true,
            id: true,
          }).nullable(),
        }),
        error: z.null().optional(),
      })
      ,
      "Inventpry by id success",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      baseResponseSchema
      ,
      "Inventpry by id not found error",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema
      ,
      "Inventpry by id validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema
      ,
      "Inventpry by id internal server error",
    ),
  },
});

export type GetOneRoute = typeof auditlogsGetOneRoute;

const auditlogsService = new AuditlogsService();
export const auditlogsGetOneHandler: AppRouteHandler<GetOneRoute> = async (c) => {
  try {
    const oneItem = await auditlogsService.findById(c.req.valid("param").id);
    if (!oneItem) {
      return c.json({
        result: null,
        error: {
          message: "Item not found",
        },
      }, HttpStatusCodes.NOT_FOUND);
    }
    return c.json({
      result: oneItem,
      error: null,
    }, HttpStatusCodes.OK);
  }
  catch (error) {
    if (error instanceof ZodError) {
      c.var.logger.error("Inventpry by id error:", error.message);
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
      c.var.logger.error("Inventpry by id internal error:", error.name);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    c.var.logger.error("Inventpry by id internal  error:", error);
    return c.json({
      result: null,
      error: {
        code: "internal-server-error",
        message: "Internal Server Error",
      } as const,
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
