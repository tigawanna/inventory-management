import type {
  PostApiInventoryHeaderParams,
  PostApiInventory200,
  PostApiInventory400,
  PostApiInventory500,
  PostApiInventoryMutationRequest,
  PostApiInventoryMutationResponse,
} from "../../types/'InventoryController/PostApiInventory.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const postApiInventoryHeaderParamsSchema = z
  .object({
    Authorization: z.string().describe('Bearer token required if no access token cookie is set').optional(),
  })
  .optional() as unknown as ToZod<PostApiInventoryHeaderParams>

/**
 * @description Inventory creation successful
 */
export const postApiInventory200Schema = z.object({
  result: z.object({
    id: z.string(),
    updated_at: z.string().nullable(),
    created_at: z.string().nullable(),
    name: z.string(),
    description: z.string().nullable(),
    quantity: z.number().int().min(-2147483648).max(2147483647),
    price: z.string(),
    categoryId: z.string().nullable(),
    sku: z.string().nullable(),
    isActive: z.boolean().nullable(),
    supplier: z.string().nullable(),
    location: z.string().nullable(),
    weight: z.string().nullable(),
    dimensions: z.string().nullable(),
    tags: z.array(z.string()).nullable(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<PostApiInventory200>

/**
 * @description Inventory creation validation error
 */
export const postApiInventory400Schema = z.object({
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
}) as unknown as ToZod<PostApiInventory400>

/**
 * @description Inventory creation internal server error
 */
export const postApiInventory500Schema = z.object({
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
}) as unknown as ToZod<PostApiInventory500>

export const postApiInventoryMutationRequestSchema = z.object({
  id: z.string().optional(),
  updated_at: z.string().nullable().nullish(),
  created_at: z.string().nullable().nullish(),
  name: z.string(),
  description: z.string().nullable().nullish(),
  quantity: z.number().int().min(-2147483648).max(2147483647).optional(),
  price: z.string(),
  categoryId: z.string().nullable().nullish(),
  sku: z.string().nullable().nullish(),
  isActive: z.boolean().nullable().nullish(),
  supplier: z.string().nullable().nullish(),
  location: z.string().nullable().nullish(),
  weight: z.string().nullable().nullish(),
  dimensions: z.string().nullable().nullish(),
  tags: z.array(z.string()).nullable().nullish(),
}) as unknown as ToZod<PostApiInventoryMutationRequest>

export const postApiInventoryMutationResponseSchema = z.lazy(() => postApiInventory200Schema) as unknown as ToZod<PostApiInventoryMutationResponse>