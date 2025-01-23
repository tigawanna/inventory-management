import type {
  GetApiUsersIdPathParams,
  GetApiUsersId200,
  GetApiUsersId400,
  GetApiUsersId404,
  GetApiUsersId500,
  GetApiUsersIdQueryResponse,
} from "../../types/'UsersController/GetApiUsersId.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const getApiUsersIdPathParamsSchema = z.object({
  id: z.string(),
}) as unknown as ToZod<GetApiUsersIdPathParams>

/**
 * @description User by id success
 */
export const getApiUsersId200Schema = z.object({
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
}) as unknown as ToZod<GetApiUsersId200>

/**
 * @description User by id validation error
 */
export const getApiUsersId400Schema = z.object({
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
}) as unknown as ToZod<GetApiUsersId400>

/**
 * @description User by id not found error
 */
export const getApiUsersId404Schema = z.object({
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
}) as unknown as ToZod<GetApiUsersId404>

/**
 * @description User by id internal server error
 */
export const getApiUsersId500Schema = z.object({
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
}) as unknown as ToZod<GetApiUsersId500>

export const getApiUsersIdQueryResponseSchema = z.lazy(() => getApiUsersId200Schema) as unknown as ToZod<GetApiUsersIdQueryResponse>