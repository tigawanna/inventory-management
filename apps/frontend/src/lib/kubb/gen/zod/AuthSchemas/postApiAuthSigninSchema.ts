import type {
  PostApiAuthSignin200,
  PostApiAuthSignin400,
  PostApiAuthSignin500,
  PostApiAuthSigninMutationRequest,
  PostApiAuthSigninMutationResponse,
} from "../../types/'AuthController/PostApiAuthSignin.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

/**
 * @description User signin successfully
 */
export const postApiAuthSignin200Schema = z.object({
  result: z.object({
    id: z.string(),
    updated_at: z.string().nullable(),
    created_at: z.string().nullable(),
    name: z.string(),
    email: z.string(),
    avatarUrl: z.string().nullable(),
    role: z.enum(['admin', 'user']).nullable(),
    refreshTokenVersion: z.number().int().min(-2147483648).max(2147483647).nullable(),
    isEmailVerified: z.boolean().nullable(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<PostApiAuthSignin200>

/**
 * @description User signin validation error
 */
export const postApiAuthSignin400Schema = z.object({
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
}) as unknown as ToZod<PostApiAuthSignin400>

/**
 * @description User signin internal error
 */
export const postApiAuthSignin500Schema = z.object({
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
}) as unknown as ToZod<PostApiAuthSignin500>

export const postApiAuthSigninMutationRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
}) as unknown as ToZod<PostApiAuthSigninMutationRequest>

export const postApiAuthSigninMutationResponseSchema = z.lazy(() => postApiAuthSignin200Schema) as unknown as ToZod<PostApiAuthSigninMutationResponse>