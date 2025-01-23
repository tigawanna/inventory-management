import type {
  PostApiCategoriesHeaderParams,
  PostApiCategories200,
  PostApiCategories400,
  PostApiCategories500,
  PostApiCategoriesMutationRequest,
  PostApiCategoriesMutationResponse,
} from "../../types/'CategoriesController/PostApiCategories.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const postApiCategoriesHeaderParamsSchema = z
  .object({
    Authorization: z.string().describe('Bearer token required if no access token cookie is set').optional(),
  })
  .optional() as unknown as ToZod<PostApiCategoriesHeaderParams>

/**
 * @description Categories creation successful
 */
export const postApiCategories200Schema = z.object({
  result: z.object({
    id: z.string(),
    updated_at: z.string().nullable(),
    created_at: z.string().nullable(),
    name: z.string(),
    description: z.string().nullable(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<PostApiCategories200>

/**
 * @description Categories creation validation error
 */
export const postApiCategories400Schema = z.object({
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
}) as unknown as ToZod<PostApiCategories400>

/**
 * @description Categories creation internal server error
 */
export const postApiCategories500Schema = z.object({
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
}) as unknown as ToZod<PostApiCategories500>

export const postApiCategoriesMutationRequestSchema = z.object({
  id: z.string().optional(),
  updated_at: z.string().nullable().nullish(),
  created_at: z.string().nullable().nullish(),
  name: z.string(),
  description: z.string().nullable().nullish(),
}) as unknown as ToZod<PostApiCategoriesMutationRequest>

export const postApiCategoriesMutationResponseSchema = z.lazy(() => postApiCategories200Schema) as unknown as ToZod<PostApiCategoriesMutationResponse>