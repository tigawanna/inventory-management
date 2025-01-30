import { createRoute, z } from "@hono/zod-openapi";
import { DrizzleError } from "drizzle-orm";
import { jsonContent } from "stoker/openapi/helpers";
import { ZodError } from "zod";

import type { AppRouteHandler } from "@/lib/types";

import HttpStatusCodes from "@/lib/status-codes";
import { returnValidationData } from "@/lib/zod";
import { userJWTSchema } from "@/schemas/auth.schema";
import { baseResponseSchema } from "@/schemas/shared-schema";

import { AuthService } from "./auth-service";

const tags = ["Auth"];

export const emailVerificationRoute = createRoute({
  path: "/verify-email",
  method: "post",
  tags,
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            email: z.string().email().optional(),
            token: z.string().optional(),
          }),
        },
      },
    },
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      baseResponseSchema.extend({
        result: userJWTSchema,
        error: z.null().optional(),
      }),
      "Email verification successful",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      baseResponseSchema.extend({
        result: z.null().optional(),
        error: z.object({
          code: z.string(),
          message: z.string(),
        }),
      }),
      "Email verification errorr : User not found",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(
      baseResponseSchema,
      "Email verification validation error",
    ),
    [HttpStatusCodes.INTERNAL_SERVER_ERROR]: jsonContent(
      baseResponseSchema,
      "Email verification internal error",
    ),
  },
});

export type EmailVerificationRoute = typeof emailVerificationRoute;

const authService = new AuthService();
export const emailVerificationHandler: AppRouteHandler<EmailVerificationRoute>
  = async (c) => {
    try {
      const newUser = await authService.verifyEmail(c.req.valid("json"));
      if (!newUser) {
        return c.json({
          result: null,
          error: {
            code: "not-found",
            message: "User not found",
          },
        }, HttpStatusCodes.NOT_FOUND);
      }

      return c.json({
        result: newUser,
        error: null,
      }, HttpStatusCodes.OK);
    }
    catch (error) {
      if (error instanceof ZodError) {
        c.var.logger.error("Email verification error:", error.message);
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
        c.var.logger.error("Email verification internal error:", error.name);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      if (error instanceof DrizzleError) {
        c.var.logger.error("Email verification drizzle error:", error);
        return c.json({
          result: null,
          error: {
            code: "internal-server-error",
            message: error.message,
          } as const,
        }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      c.var.logger.error("Email verification internal error:", error);
      return c.json({
        result: null,
        error: {
          code: "internal-server-error",
          message: "Internal Server Error",
        } as const,
      }, HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }
  };
