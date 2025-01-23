import type {
  GetApiUsersQueryParams,
  GetApiUsers200,
  GetApiUsers400,
  GetApiUsers500,
  GetApiUsersQueryResponse,
} from "../../types/'UsersController/GetApiUsers.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const getApiUsersQueryParamsSchema = z
  .object({
    page: z.string().default('1'),
    limit: z.string().default('10'),
    order: z.enum(['asc', 'desc']).default('desc'),
    search: z.string().optional(),
    sort: z.enum(['created_at']).optional(),
  })
  .optional() as unknown as ToZod<GetApiUsersQueryParams>

/**
 * @description Users listing success
 */
export const getApiUsers200Schema = z.object({
  result: z.object({
    page: z.number().nullable(),
    perPage: z.number().nullable(),
    totalItems: z.number().nullable(),
    totalPages: z.number().nullable(),
    items: z.array(
      z.object({
        id: z.string(),
        updated_at: z.string().nullable(),
        created_at: z.string().nullable(),
        name: z.string(),
        email: z.string(),
        avatarUrl: z.string().nullable(),
        role: z.enum(['admin', 'user']).nullable(),
        isEmailVerified: z.boolean().nullable(),
      }),
    ),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<GetApiUsers200>

/**
 * @description Users listing validation error
 */
export const getApiUsers400Schema = z.object({
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
}) as unknown as ToZod<GetApiUsers400>

/**
 * @description Users listing internal server error
 */
export const getApiUsers500Schema = z.object({
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
}) as unknown as ToZod<GetApiUsers500>

export const getApiUsersQueryResponseSchema = z.lazy(() => getApiUsers200Schema) as unknown as ToZod<GetApiUsersQueryResponse>