import type {
  PostApiAuthVerifyEmail200,
  PostApiAuthVerifyEmail400,
  PostApiAuthVerifyEmail404,
  PostApiAuthVerifyEmail500,
  PostApiAuthVerifyEmailMutationRequest,
  PostApiAuthVerifyEmailMutationResponse,
} from "../../types/'AuthController/PostApiAuthVerifyEmail.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

/**
 * @description Email verification successful
 */
export const postApiAuthVerifyEmail200Schema = z.object({
  result: z.object({
    id: z.string(),
    updated_at: z.string().nullable(),
    created_at: z.string().nullable(),
    name: z.string(),
    email: z.string(),
    avatarUrl: z.string().nullable(),
    role: z.enum(['admin', 'user', 'suspended']).nullable(),
    refreshTokenVersion: z.number().int().min(-2147483648).max(2147483647).nullable(),
    isEmailVerified: z.boolean().nullable(),
    lastLoginAt: z.string().nullable(),
    metadata: z.object({}).catchall(z.unknown()).nullable(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<PostApiAuthVerifyEmail200>

/**
 * @description Email verification validation error
 */
export const postApiAuthVerifyEmail400Schema = z.object({
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
}) as unknown as ToZod<PostApiAuthVerifyEmail400>

/**
 * @description Email verification errorr : User not found
 */
export const postApiAuthVerifyEmail404Schema = z.object({
  result: z.unknown().nullish(),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
}) as unknown as ToZod<PostApiAuthVerifyEmail404>

/**
 * @description Email verification internal error
 */
export const postApiAuthVerifyEmail500Schema = z.object({
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
}) as unknown as ToZod<PostApiAuthVerifyEmail500>

export const postApiAuthVerifyEmailMutationRequestSchema = z.object({
  email: z.string().email().optional(),
  token: z.string().optional(),
}) as unknown as ToZod<PostApiAuthVerifyEmailMutationRequest>

export const postApiAuthVerifyEmailMutationResponseSchema = z.lazy(
  () => postApiAuthVerifyEmail200Schema,
) as unknown as ToZod<PostApiAuthVerifyEmailMutationResponse>