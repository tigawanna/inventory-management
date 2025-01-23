import type {
  PostApiAuthRequestPasswordReset200,
  PostApiAuthRequestPasswordReset400,
  PostApiAuthRequestPasswordReset404,
  PostApiAuthRequestPasswordReset500,
  PostApiAuthRequestPasswordResetMutationRequest,
  PostApiAuthRequestPasswordResetMutationResponse,
} from "../../types/'AuthController/PostApiAuthRequestPasswordReset.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

/**
 * @description Password reset request successful
 */
export const postApiAuthRequestPasswordReset200Schema = z.object({
  result: z.object({
    message: z.string(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<PostApiAuthRequestPasswordReset200>

/**
 * @description Password reset request validation error
 */
export const postApiAuthRequestPasswordReset400Schema = z.object({
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
}) as unknown as ToZod<PostApiAuthRequestPasswordReset400>

/**
 * @description Password reset request errorr : User not found
 */
export const postApiAuthRequestPasswordReset404Schema = z.object({
  result: z.unknown().nullish(),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
}) as unknown as ToZod<PostApiAuthRequestPasswordReset404>

/**
 * @description Password reset request internal error
 */
export const postApiAuthRequestPasswordReset500Schema = z.object({
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
}) as unknown as ToZod<PostApiAuthRequestPasswordReset500>

export const postApiAuthRequestPasswordResetMutationRequestSchema = z.object({
  email: z.string().email(),
}) as unknown as ToZod<PostApiAuthRequestPasswordResetMutationRequest>

export const postApiAuthRequestPasswordResetMutationResponseSchema = z.lazy(
  () => postApiAuthRequestPasswordReset200Schema,
) as unknown as ToZod<PostApiAuthRequestPasswordResetMutationResponse>