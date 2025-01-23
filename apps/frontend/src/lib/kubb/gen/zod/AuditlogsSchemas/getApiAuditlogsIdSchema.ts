import type {
  GetApiAuditlogsIdPathParams,
  GetApiAuditlogsId200,
  GetApiAuditlogsId400,
  GetApiAuditlogsId404,
  GetApiAuditlogsId500,
  GetApiAuditlogsIdQueryResponse,
} from "../../types/'AuditlogsController/GetApiAuditlogsId.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const getApiAuditlogsIdPathParamsSchema = z.object({
  id: z.string(),
}) as unknown as ToZod<GetApiAuditlogsIdPathParams>

/**
 * @description Inventpry by id success
 */
export const getApiAuditlogsId200Schema = z.object({
  result: z.object({
    id: z.string(),
    updated_at: z.string().nullable(),
    created_at: z.string().nullable(),
    userId: z.string().nullable(),
    action: z.enum(['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'PASSWORD_RESET', 'EMAIL_VERIFY']),
    entityType: z.enum(['USER', 'INVENTORY', 'CATEGORY']),
    entityId: z.string(),
    ipAddress: z.string().nullable(),
    oldData: z.unknown().nullish(),
    newData: z.unknown().nullish(),
    user: z
      .object({
        name: z.string(),
        email: z.string(),
        avatarUrl: z.string().nullable(),
        role: z.enum(['admin', 'user']).nullable(),
        id: z.string(),
      })
      .nullable(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<GetApiAuditlogsId200>

/**
 * @description Inventpry by id validation error
 */
export const getApiAuditlogsId400Schema = z.object({
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
}) as unknown as ToZod<GetApiAuditlogsId400>

/**
 * @description Inventpry by id not found error
 */
export const getApiAuditlogsId404Schema = z.object({
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
}) as unknown as ToZod<GetApiAuditlogsId404>

/**
 * @description Inventpry by id internal server error
 */
export const getApiAuditlogsId500Schema = z.object({
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
}) as unknown as ToZod<GetApiAuditlogsId500>

export const getApiAuditlogsIdQueryResponseSchema = z.lazy(() => getApiAuditlogsId200Schema) as unknown as ToZod<GetApiAuditlogsIdQueryResponse>