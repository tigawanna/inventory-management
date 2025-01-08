import { z } from "zod";
export const errorCodes ={
  loginRequired:"login-required",
  adminRequired:"admin-required",
  parametersRequired:"parameters-required"
} as const
const errorCodesArray = [
  errorCodes.loginRequired,
  errorCodes.adminRequired,
  errorCodes.parametersRequired
] as const
export const errorSchema = z.object({
  message: z.string(),
  code: z.enum(errorCodesArray).optional(),
});

export type ErrorSchema = z.infer<typeof errorSchema>;
