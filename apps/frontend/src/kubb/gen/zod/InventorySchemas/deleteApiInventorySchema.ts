import type {
  DeleteApiInventoryHeaderParams,
  DeleteApiInventory200,
  DeleteApiInventory400,
  DeleteApiInventory404,
  DeleteApiInventory500,
  DeleteApiInventoryMutationRequest,
  DeleteApiInventoryMutationResponse,
} from "../../types/'InventoryController/DeleteApiInventory.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const deleteApiInventoryHeaderParamsSchema = z
  .object({
    Authorization: z.string().describe('Bearer token required if no access token cookie is set').optional(),
  })
  .optional() as unknown as ToZod<DeleteApiInventoryHeaderParams>

/**
 * @description Inventory deletion successful
 */
export const deleteApiInventory200Schema = z.object({
  result: z.object({
    message: z.string(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<DeleteApiInventory200>

/**
 * @description Inventory deletion validation error
 */
export const deleteApiInventory400Schema = z.object({
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
}) as unknown as ToZod<DeleteApiInventory400>

/**
 * @description Inventory deletion not found error
 */
export const deleteApiInventory404Schema = z.object({
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
}) as unknown as ToZod<DeleteApiInventory404>

/**
 * @description Inventory deletion internal server error
 */
export const deleteApiInventory500Schema = z.object({
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
}) as unknown as ToZod<DeleteApiInventory500>

export const deleteApiInventoryMutationRequestSchema = z.object({
  id: z.string(),
}) as unknown as ToZod<DeleteApiInventoryMutationRequest>

export const deleteApiInventoryMutationResponseSchema = z.lazy(() => deleteApiInventory200Schema) as unknown as ToZod<DeleteApiInventoryMutationResponse>