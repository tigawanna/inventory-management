import { capitalizeFirstLetter } from "@/cmd/utils/string";

interface ApiDeleteTemplateProps {
  routename: string;
}
export function apiCreateTemplate({ routename }: ApiDeleteTemplateProps) {
  const capitalizedRoutename = capitalizeFirstLetter(routename);
  const filename = `${routename}.delete.ts`;
  const template = `
import { createRoute } from "@hono/zod-openapi";
import { DrizzleError } from "drizzle-orm";
import { jsonContent } from "stoker/openapi/helpers";
import { z, ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { baseResponseSchema } from "@/schemas/shared-schema";

import type {
  ${capitalizedRoutename}Item,
} from "./${routename}.schema";

import {
  ${routename}InsertSchema,
  ${routename}SelectSchema,
} from "./${routename}.schema";
import { ${capitalizedRoutename}Service } from "./${routename}.service";

const tags = ["${capitalizedRoutename}"];

export const ${routename}CreateRoute = createRoute({
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
          schema: ${routename}InsertSchema,
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      baseResponseSchema.extend({
        result: ${routename}SelectSchema,
        error: z.null().optional(),
      }),
      "${capitalizedRoutename} creation successful",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema,
      "${capitalizedRoutename} creation validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema,
      "${capitalizedRoutename} creation internal server error",
    ),
  },
});

export type Create${capitalizedRoutename}Route = typeof ${routename}CreateRoute;

const ${routename}Service = new ${capitalizedRoutename}Service();
export const ${routename}CreateHandler: AppRouteHandler<Create${capitalizedRoutename}Route> = async (c) => {
  try {
    const ${routename} = await ${routename}Service.create(c.req.valid("json")) as ${capitalizedRoutename}Item;
    return c.json({
      result: ${routename},
      error: null,
    }, HttpStatusCodes.OK);
  }
  catch (error) {
    if (error instanceof ZodError) {
      c.var.logger.error("${capitalizedRoutename} creation  error:", error.message);
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
      c.var.logger.error("${capitalizedRoutename} creation  error:", error.name);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    if (error instanceof DrizzleError) {
      c.var.logger.error("${capitalizedRoutename} creation drizzle error:", error);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: error.message,
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    c.var.logger.error("${capitalizedRoutename} creation  internal  error:", error);
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
  return {
    filename,
    template,
  };
}
