import type {
  PatchApiCategoriesHeaderParams,
  PatchApiCategories200,
  PatchApiCategories400,
  PatchApiCategories500,
  PatchApiCategoriesMutationRequest,
  PatchApiCategoriesMutationResponse,
} from "../../types/'CategoriesController/PatchApiCategories.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const patchApiCategoriesHeaderParamsSchema = z
  .object({
    Authorization: z.string().describe('Bearer token required if no access token cookie is set').optional(),
  })
  .optional() as unknown as ToZod<PatchApiCategoriesHeaderParams>

/**
 * @description Categories update successful
 */
export const patchApiCategories200Schema = z.object({
  result: z.object({
    id: z.string(),
    updated_at: z.string().nullable(),
    created_at: z.string().nullable(),
    name: z.string(),
    description: z.string().nullable(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<PatchApiCategories200>

/**
 * @description Categories update validation error
 */
export const patchApiCategories400Schema = z.object({
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
}) as unknown as ToZod<PatchApiCategories400>

/**
 * @description Categories update internal server error
 */
export const patchApiCategories500Schema = z.object({
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
}) as unknown as ToZod<PatchApiCategories500>

export const patchApiCategoriesMutationRequestSchema = z.object({
  id: z.string(),
  updated_at: z.string().nullable().nullish(),
  created_at: z.string().nullable().nullish(),
  name: z.string().optional(),
  description: z.string().nullable().nullish(),
}) as unknown as ToZod<PatchApiCategoriesMutationRequest>

export const patchApiCategoriesMutationResponseSchema = z.lazy(() => patchApiCategories200Schema) as unknown as ToZod<PatchApiCategoriesMutationResponse>