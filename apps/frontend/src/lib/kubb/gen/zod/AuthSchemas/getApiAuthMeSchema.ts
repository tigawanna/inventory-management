import type { GetApiAuthMe200, GetApiAuthMe400, GetApiAuthMe404, GetApiAuthMe500, GetApiAuthMeQueryResponse } from "../../types/'AuthController/GetApiAuthMe.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

/**
 * @description Current user successfully
 */
export const getApiAuthMe200Schema = z.object({
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
}) as unknown as ToZod<GetApiAuthMe200>

/**
 * @description Current user validation error
 */
export const getApiAuthMe400Schema = z.object({
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
}) as unknown as ToZod<GetApiAuthMe400>

/**
 * @description Current user not found error
 */
export const getApiAuthMe404Schema = z.object({
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
}) as unknown as ToZod<GetApiAuthMe404>

/**
 * @description Current user internal error
 */
export const getApiAuthMe500Schema = z.object({
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
}) as unknown as ToZod<GetApiAuthMe500>

export const getApiAuthMeQueryResponseSchema = z.lazy(() => getApiAuthMe200Schema) as unknown as ToZod<GetApiAuthMeQueryResponse>