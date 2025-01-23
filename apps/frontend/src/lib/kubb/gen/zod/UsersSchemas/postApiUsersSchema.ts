import type {
  PostApiUsersHeaderParams,
  PostApiUsers200,
  PostApiUsers400,
  PostApiUsers500,
  PostApiUsersMutationRequest,
  PostApiUsersMutationResponse,
} from "../../types/'UsersController/PostApiUsers.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const postApiUsersHeaderParamsSchema = z
  .object({
    Authorization: z.string().describe('Bearer token required if no access token cookie is set').optional(),
  })
  .optional() as unknown as ToZod<PostApiUsersHeaderParams>

/**
 * @description Users creation successful
 */
export const postApiUsers200Schema = z.object({
  result: z.object({
    id: z.string(),
    updated_at: z.string().nullable(),
    created_at: z.string().nullable(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    avatarUrl: z.string().nullable(),
    role: z.enum(['admin', 'user']).nullable(),
    refreshToken: z.string().nullable(),
    refreshTokenVersion: z.number().int().min(-2147483648).max(2147483647).nullable(),
    verificationToken: z.string().nullable(),
    isEmailVerified: z.boolean().nullable(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<PostApiUsers200>

/**
 * @description Users creation validation error
 */
export const postApiUsers400Schema = z.object({
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
}) as unknown as ToZod<PostApiUsers400>

/**
 * @description Users creation internal server error
 */
export const postApiUsers500Schema = z.object({
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
}) as unknown as ToZod<PostApiUsers500>

export const postApiUsersMutationRequestSchema = z.object({
  id: z.string().optional(),
  updated_at: z.string().nullable().nullish(),
  created_at: z.string().nullable().nullish(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  avatarUrl: z.string().nullable().nullish(),
  role: z.enum(['admin', 'user']).nullable().nullish(),
  refreshToken: z.string().nullable().nullish(),
  refreshTokenVersion: z.number().int().min(-2147483648).max(2147483647).nullable().nullish(),
  verificationToken: z.string().nullable().nullish(),
  isEmailVerified: z.boolean().nullable().nullish(),
}) as unknown as ToZod<PostApiUsersMutationRequest>

export const postApiUsersMutationResponseSchema = z.lazy(() => postApiUsers200Schema) as unknown as ToZod<PostApiUsersMutationResponse>