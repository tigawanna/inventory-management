
import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { z, ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { baseListResponseSchema, baseResponseSchema } from "@/schemas/shared-schema";

import {
  auditlogsSelectSchema,
  listAuditlogsQueryParamsSchema,
} from "./auditlogs.schema";
import { AuditlogsService } from "./auditlogs.service";

const tags = ["Auditlogs"];

export const auditlogsListRoute = createRoute({
  path: "/",
  method: "get",
  tags,
  request: {
    query: listAuditlogsQueryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      baseResponseSchema.extend({ 
        result: baseListResponseSchema.extend({ items: z.array(auditlogsSelectSchema) }),
        error:z.null().optional(),
      })
      ,
      "Auditlogs listing success",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema
      ,
      "Auditlogs listing validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema
      ,
      "Auditlogs listing internal server error",
    ),
  },
});

export type ListRoute = typeof auditlogsListRoute;


const auditlogsService = new AuditlogsService();
export const auditlogsListHandler: AppRouteHandler<ListRoute> = async (c) => {
  try {
    const auditlogs = await auditlogsService.findAll(c.req.valid("query"));
    return c.json({
      result: auditlogs,
      error: null,
    }, HttpStatusCodes.OK);
  }
  catch (error) {
    if (error instanceof ZodError) {
      c.var.logger.error("Auditlogs listing error:", error.message);
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
      c.var.logger.error("Auditlogs listing internal error:", error.name);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    c.var.logger.error("Auditlogs listing internal  error:", error);
    return c.json({
      result: null,
      error: {
        code: "internal-server-error",
        message: "Internal Server Error",
      } as const,
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

    