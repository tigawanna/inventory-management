import { z, ZodArray } from "zod";

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
  patloadRequired: "patload-required",
} as const;

const errorCodesArray = [
  errorCodes.loginRequired,
  errorCodes.adminRequired,
  errorCodes.parametersRequired,
] as const;

export const errorSchema = z.object({
  message: z.string(),
  code: z.enum(errorCodesArray).optional(),
  data: z
    .array(
      z.record(
        z.string(),
        z.object({
          code: z.string(),
          message: z.string(),
        })
      )
    )
    .optional(),
});

export type ErrorSchema = z.infer<typeof errorSchema>;
