import type {
  PostApiAuthResetPassword200,
  PostApiAuthResetPassword400,
  PostApiAuthResetPassword404,
  PostApiAuthResetPassword500,
  PostApiAuthResetPasswordMutationRequest,
  PostApiAuthResetPasswordMutationResponse,
} from "../../types/'AuthController/PostApiAuthResetPassword.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

/**
 * @description Password reset successful
 */
export const postApiAuthResetPassword200Schema = z.object({
  result: z.object({
    message: z.string(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<PostApiAuthResetPassword200>

/**
 * @description Password reset validation error
 */
export const postApiAuthResetPassword400Schema = z.object({
  result: z.unknown().nullish(),
  error: z
    .object({
      message: z.string(),
      code: z
        .enum([
          'login-required',
          'admin-required',
          'parameters-required',
          'query-parametersRequired-required',
          'payload-required',
          'internal-server-error',
          'not-found',
        ])
        .optional(),
      data: z
        .object({})
        .catchall(
          z.object({
            code: z.string(),
            message: z.string(),
          }),
        )
        .optional(),
    })
    .nullable(),
}) as unknown as ToZod<PostApiAuthResetPassword400>

/**
 * @description Password reset errorr : User not found
 */
export const postApiAuthResetPassword404Schema = z.object({
  result: z.unknown().nullish(),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
}) as unknown as ToZod<PostApiAuthResetPassword404>

/**
 * @description Password reset internal error
 */
export const postApiAuthResetPassword500Schema = z.object({
  result: z.unknown().nullish(),
  error: z
    .object({
      message: z.string(),
      code: z
        .enum([
          'login-required',
          'admin-required',
          'parameters-required',
          'query-parametersRequired-required',
          'payload-required',
          'internal-server-error',
          'not-found',
        ])
        .optional(),
      data: z
        .object({})
        .catchall(
          z.object({
            code: z.string(),
            message: z.string(),
          }),
        )
        .optional(),
    })
    .nullable(),
}) as unknown as ToZod<PostApiAuthResetPassword500>

export const postApiAuthResetPasswordMutationRequestSchema = z.object({
  token: z.string(),
  newPassword: z.string(),
}) as unknown as ToZod<PostApiAuthResetPasswordMutationRequest>

export const postApiAuthResetPasswordMutationResponseSchema = z.lazy(
  () => postApiAuthResetPassword200Schema,
) as unknown as ToZod<PostApiAuthResetPasswordMutationResponse>