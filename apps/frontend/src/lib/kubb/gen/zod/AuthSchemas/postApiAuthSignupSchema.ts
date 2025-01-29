import type {
  PostApiAuthSignup200,
  PostApiAuthSignup400,
  PostApiAuthSignup404,
  PostApiAuthSignup500,
  PostApiAuthSignupMutationRequest,
  PostApiAuthSignupMutationResponse,
} from "../../types/'AuthController/PostApiAuthSignup.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

/**
 * @description User signup successfully
 */
export const postApiAuthSignup200Schema = z.object({
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
}) as unknown as ToZod<PostApiAuthSignup200>

/**
 * @description User signup validation error
 */
export const postApiAuthSignup400Schema = z.object({
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
}) as unknown as ToZod<PostApiAuthSignup400>

/**
 * @description User signup not found error
 */
export const postApiAuthSignup404Schema = z.object({
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
}) as unknown as ToZod<PostApiAuthSignup404>

/**
 * @description User signup internal error
 */
export const postApiAuthSignup500Schema = z.object({
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
}) as unknown as ToZod<PostApiAuthSignup500>

export const postApiAuthSignupMutationRequestSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
}) as unknown as ToZod<PostApiAuthSignupMutationRequest>

export const postApiAuthSignupMutationResponseSchema = z.lazy(() => postApiAuthSignup200Schema) as unknown as ToZod<PostApiAuthSignupMutationResponse>