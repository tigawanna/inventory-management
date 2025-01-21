import { notFound } from "stoker/middlewares";
import { z } from "zod";

export const genericQueryParamsSchema = z.object({
  page: z.string().default("1"),
  limit: z.string().default("10"),
  //   sort: z.enum(sortBy).optional(),
  order: z.enum(["asc", "desc"]).default("desc"),
  search: z.string().optional(),
});

export const errorCodes = {
  loginRequired: "login-required",
  adminRequired: "admin-required",
  parametersRequired: "parameters-required",
  queryParametersRequired: "query-parametersRequired-required",
  payloadRequired: "payload-required",
  internalServererror: "internal-server-error",
  notFound: "not-found",
} as const;

const errorCodesArray = [
  errorCodes.loginRequired,
  errorCodes.adminRequired,
  errorCodes.parametersRequired,
  errorCodes.queryParametersRequired,
  errorCodes.payloadRequired,
  errorCodes.internalServererror,
  errorCodes.notFound,
] as const;

export const errorSchema = z.object({
  message: z.string(),
  code: z.enum(errorCodesArray).optional(),
  data: z.record(
    z.string(),
    z.object({
      code: z.string(),
      message: z.string(),
    }),
  )
    .optional(),
});

export type ErrorSchema = z.infer<typeof errorSchema>;

export const baseListResponseSchema = z.object({
  page: z.coerce.number(),
  perPage: z.coerce.number(),
  totalItems: z.coerce.number(),
  totalPages: z.coerce.number(),
});

export const baseResponseSchema = z.object({
  result: z.any().nullable(),
  error: errorSchema.nullable(),
});
