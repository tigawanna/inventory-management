import type {
  GetApiCategoriesQueryParams,
  GetApiCategories200,
  GetApiCategories400,
  GetApiCategories500,
  GetApiCategoriesQueryResponse,
} from "../../types/'CategoriesController/GetApiCategories.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const getApiCategoriesQueryParamsSchema = z
  .object({
    page: z.number().default(1).nullable().nullish(),
    limit: z.number().default(10).nullable().nullish(),
    order: z.enum(['asc', 'desc']).default('desc'),
    search: z.string().optional(),
    sort: z.enum(['created_at', 'name']).optional(),
  })
  .optional() as unknown as ToZod<GetApiCategoriesQueryParams>

/**
 * @description Categories listing success
 */
export const getApiCategories200Schema = z.object({
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
        description: z.string().nullable(),
      }),
    ),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<GetApiCategories200>

/**
 * @description Categories listing validation error
 */
export const getApiCategories400Schema = z.object({
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
}) as unknown as ToZod<GetApiCategories400>

/**
 * @description Categories listing internal server error
 */
export const getApiCategories500Schema = z.object({
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
}) as unknown as ToZod<GetApiCategories500>

export const getApiCategoriesQueryResponseSchema = z.lazy(() => getApiCategories200Schema) as unknown as ToZod<GetApiCategoriesQueryResponse>