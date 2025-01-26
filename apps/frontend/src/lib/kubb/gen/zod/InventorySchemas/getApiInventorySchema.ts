import type {
  GetApiInventoryQueryParams,
  GetApiInventory200,
  GetApiInventory400,
  GetApiInventory500,
  GetApiInventoryQueryResponse,
} from "../../types/'InventoryController/GetApiInventory.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const getApiInventoryQueryParamsSchema = z
  .object({
    page: z.number().default(1).nullable().nullish(),
    limit: z.number().default(10).nullable().nullish(),
    order: z.enum(['asc', 'desc']).default('desc'),
    search: z.string().optional(),
    sort: z.enum(['name', 'price', 'quantity']).optional(),
    categoryId: z.string().optional(),
  })
  .optional() as unknown as ToZod<GetApiInventoryQueryParams>

/**
 * @description Inventpry listing success
 */
export const getApiInventory200Schema = z.object({
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
    ),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<GetApiInventory200>

/**
 * @description Inventpry listing validation error
 */
export const getApiInventory400Schema = z.object({
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
}) as unknown as ToZod<GetApiInventory400>

/**
 * @description Inventpry listing internal server error
 */
export const getApiInventory500Schema = z.object({
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
}) as unknown as ToZod<GetApiInventory500>

export const getApiInventoryQueryResponseSchema = z.lazy(() => getApiInventory200Schema) as unknown as ToZod<GetApiInventoryQueryResponse>