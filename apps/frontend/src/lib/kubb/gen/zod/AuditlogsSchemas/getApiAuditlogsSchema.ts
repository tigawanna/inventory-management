import type {
  GetApiAuditlogsQueryParams,
  GetApiAuditlogs200,
  GetApiAuditlogs400,
  GetApiAuditlogs500,
  GetApiAuditlogsQueryResponse,
} from "../../types/'AuditlogsController/GetApiAuditlogs.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const getApiAuditlogsQueryParamsSchema = z
  .object({
    page: z.number().default(1).nullable().nullish(),
    limit: z.number().default(10).nullable().nullish(),
    order: z.enum(['asc', 'desc']).default('desc'),
    search: z.string().optional(),
    sort: z.enum(['created_at']).optional(),
    entity: z.enum(['USER', 'INVENTORY', 'CATEGORY']).optional(),
    action: z.enum(['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'PASSWORD_RESET', 'EMAIL_VERIFY']).optional(),
  })
  .optional() as unknown as ToZod<GetApiAuditlogsQueryParams>

/**
 * @description Auditlogs listing success
 */
export const getApiAuditlogs200Schema = z.object({
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
        userId: z.string().nullable(),
        action: z.enum(['CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'PASSWORD_RESET', 'EMAIL_VERIFY']),
        entityType: z.enum(['USER', 'INVENTORY', 'CATEGORY']),
        entityId: z.string(),
        ipAddress: z.string().nullable(),
        oldData: z.object({}).catchall(z.unknown()).nullable(),
        newData: z.object({}).catchall(z.unknown()).nullable(),
        user: z
          .object({
            name: z.string(),
            email: z.string(),
            avatarUrl: z.string().nullable(),
            role: z.enum(['admin', 'user', 'suspended']).nullable(),
            id: z.string(),
          })
          .nullable(),
      }),
    ),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<GetApiAuditlogs200>

/**
 * @description Auditlogs listing validation error
 */
export const getApiAuditlogs400Schema = z.object({
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
}) as unknown as ToZod<GetApiAuditlogs400>

/**
 * @description Auditlogs listing internal server error
 */
export const getApiAuditlogs500Schema = z.object({
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
}) as unknown as ToZod<GetApiAuditlogs500>

export const getApiAuditlogsQueryResponseSchema = z.lazy(() => getApiAuditlogs200Schema) as unknown as ToZod<GetApiAuditlogsQueryResponse>