import type {
  GetApiCategoriesIdPathParams,
  GetApiCategoriesId200,
  GetApiCategoriesId400,
  GetApiCategoriesId404,
  GetApiCategoriesId500,
  GetApiCategoriesIdQueryResponse,
} from "../../types/'CategoriesController/GetApiCategoriesId.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const getApiCategoriesIdPathParamsSchema = z.object({
  id: z.string(),
}) as unknown as ToZod<GetApiCategoriesIdPathParams>

/**
 * @description Category by id success
 */
export const getApiCategoriesId200Schema = z.object({
  result: z.object({
    id: z.string(),
    updated_at: z.string().nullable(),
    created_at: z.string().nullable(),
    name: z.string(),
    description: z.string().nullable(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<GetApiCategoriesId200>

/**
 * @description Category by id validation error
 */
export const getApiCategoriesId400Schema = z.object({
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
}) as unknown as ToZod<GetApiCategoriesId400>

/**
 * @description Category by id not found error
 */
export const getApiCategoriesId404Schema = z.object({
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
}) as unknown as ToZod<GetApiCategoriesId404>

/**
 * @description Category by id internal server error
 */
export const getApiCategoriesId500Schema = z.object({
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
}) as unknown as ToZod<GetApiCategoriesId500>

export const getApiCategoriesIdQueryResponseSchema = z.lazy(() => getApiCategoriesId200Schema) as unknown as ToZod<GetApiCategoriesIdQueryResponse>