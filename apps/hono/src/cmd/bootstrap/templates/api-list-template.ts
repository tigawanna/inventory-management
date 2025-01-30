import { capitalizeFirstLetter } from "@/cmd/utils/string";

interface ApiListTemplateProps {
  routename: string;
}
export function apiListTemplate({ routename }: ApiListTemplateProps) {
  const capitalizedRoutename = capitalizeFirstLetter(routename);
  const filename = `${routename}.list.ts`;
  const template = `
import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import { z, ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { baseListResponseSchema, baseResponseSchema } from "@/schemas/shared-schema";

import {
  ${routename}SelectSchema,
  list${capitalizedRoutename}QueryParamsSchema,
} from "./${routename}.schema";
import { ${capitalizedRoutename}Service } from "./${routename}.service";

const tags = ["${capitalizedRoutename}"];

export const ${routename}ListRoute = createRoute({
  path: "/",
  method: "get",
  tags,
  request: {
    query: list${capitalizedRoutename}QueryParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      baseResponseSchema.extend({ 
        result: baseListResponseSchema.extend({ items: z.array(${routename}SelectSchema) }),
        error:z.null().optional(),
      })
      ,
      "${capitalizedRoutename}listing success",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema
      ,
      "${capitalizedRoutename}listing validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema
      ,
      "${capitalizedRoutename}listing internal server error",
    ),
  },
});

export type ListRoute = typeof ${routename}ListRoute;

const ${routename}Service = new ${capitalizedRoutename}Service();
export const ${routename}ListHandler: AppRouteHandler<ListRoute> = async (c) => {
  try {
    const ${routename} = await ${routename}Service.findAll(c.req.valid("query"));
    return c.json({
      result: ${routename},
      error: null,
    }, HttpStatusCodes.OK);
  }
  catch (error) {
    if (error instanceof ZodError) {
      c.var.logger.error("${capitalizedRoutename}listing error:", error.message);
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
      c.var.logger.error("${capitalizedRoutename}listing internal error:", error.name);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    c.var.logger.error("${capitalizedRoutename}listing internal  error:", error);
    return c.json({
      result: null,
      error: {
        code: "internal-server-error",
        message: "Internal Server Error",
      } as const,
    }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};

    `;

  return { filename, template };
}
