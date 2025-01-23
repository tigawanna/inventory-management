import type {
  GetApiInventoryIdPathParams,
  GetApiInventoryId200,
  GetApiInventoryId400,
  GetApiInventoryId404,
  GetApiInventoryId500,
  GetApiInventoryIdQueryResponse,
} from "../../types/'InventoryController/GetApiInventoryId.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const getApiInventoryIdPathParamsSchema = z.object({
  id: z.string(),
}) as unknown as ToZod<GetApiInventoryIdPathParams>

/**
 * @description Inventpry by id success
 */
export const getApiInventoryId200Schema = z.object({
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
}) as unknown as ToZod<GetApiInventoryId200>

/**
 * @description Inventpry by id validation error
 */
export const getApiInventoryId400Schema = z.object({
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
}) as unknown as ToZod<GetApiInventoryId400>

/**
 * @description Inventpry by id not found error
 */
export const getApiInventoryId404Schema = z.object({
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
}) as unknown as ToZod<GetApiInventoryId404>

/**
 * @description Inventpry by id internal server error
 */
export const getApiInventoryId500Schema = z.object({
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
}) as unknown as ToZod<GetApiInventoryId500>

export const getApiInventoryIdQueryResponseSchema = z.lazy(() => getApiInventoryId200Schema) as unknown as ToZod<GetApiInventoryIdQueryResponse>