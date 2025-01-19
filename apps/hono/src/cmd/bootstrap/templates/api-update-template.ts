import { capitalizeFirstLetter } from "@/cmd/utils/string";

interface ApiUpdateTemplateProps {
  routename: string;
}
export function apiUpdateTemplate({ routename }: ApiUpdateTemplateProps) {
  const capitalizedRoutename = capitalizeFirstLetter(routename);
return `
import { createRoute } from "@hono/zod-openapi";
import { DrizzleError } from "drizzle-orm";
import { jsonContent } from "stoker/openapi/helpers";
import { z, ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { baseResponseSchema } from "@/schemas/shared-schema";

import type { ${capitalizedRoutename}Item } from "./${routename}.schema";

import {
  ${routename}SelectSchema,
  ${routename}UpdateSchema,
} from "./${routename}.schema";
import { ${capitalizedRoutename}Service } from "./${routename}.service";

const tags = ["${capitalizedRoutename}"];

export const ${routename}UpdateRoute = createRoute({
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
          schema: ${routename}UpdateSchema.extend({id:z.string()}),
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
      "${capitalizedRoutename} update successful",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema,
      "${capitalizedRoutename} update validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema,
      "${capitalizedRoutename} update internal server error",
    ),
  },
});

export type Update${capitalizedRoutename}Route = typeof ${routename}UpdateRoute;

const ${routename}Service = new ${capitalizedRoutename}Service();
export const ${routename}UpdateHandler: AppRouteHandler<Update${capitalizedRoutename}Route> =
  async (c) => {
    try {
      const newItem = c.req.valid("json");
      const ${routename} = await ${routename}Service.update(
        newItem.id,
        newItem
      ) as ${capitalizedRoutename}Item;
      return c.json({
        result: ${routename},
        error: null,
      }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof ZodError) {
        c.var.logger.error("${capitalizedRoutename} update  error:", error.message);
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
        c.var.logger.error("${capitalizedRoutename} update  error:", error.name);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      if (error instanceof DrizzleError) {
        c.var.logger.error("${capitalizedRoutename} update drizzle error:", error);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      c.var.logger.error("${capitalizedRoutename} update  internal  error:", error);
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
}
