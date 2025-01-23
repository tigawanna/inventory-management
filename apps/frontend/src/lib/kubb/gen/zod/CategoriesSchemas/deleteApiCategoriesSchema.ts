import type {
  DeleteApiCategoriesHeaderParams,
  DeleteApiCategories200,
  DeleteApiCategories400,
  DeleteApiCategories404,
  DeleteApiCategories500,
  DeleteApiCategoriesMutationRequest,
  DeleteApiCategoriesMutationResponse,
} from "../../types/'CategoriesController/DeleteApiCategories.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const deleteApiCategoriesHeaderParamsSchema = z
  .object({
    Authorization: z.string().describe('Bearer token required if no access token cookie is set').optional(),
  })
  .optional() as unknown as ToZod<DeleteApiCategoriesHeaderParams>

/**
 * @description Categories deletion successful
 */
export const deleteApiCategories200Schema = z.object({
  result: z.object({
    message: z.string(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<DeleteApiCategories200>

/**
 * @description Categories deletion validation error
 */
export const deleteApiCategories400Schema = z.object({
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
}) as unknown as ToZod<DeleteApiCategories400>

/**
 * @description Categories deletion not found error
 */
export const deleteApiCategories404Schema = z.object({
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
}) as unknown as ToZod<DeleteApiCategories404>

/**
 * @description Categories deletion internal server error
 */
export const deleteApiCategories500Schema = z.object({
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
}) as unknown as ToZod<DeleteApiCategories500>

export const deleteApiCategoriesMutationRequestSchema = z.object({
  id: z.string(),
}) as unknown as ToZod<DeleteApiCategoriesMutationRequest>

export const deleteApiCategoriesMutationResponseSchema = z.lazy(() => deleteApiCategories200Schema) as unknown as ToZod<DeleteApiCategoriesMutationResponse>