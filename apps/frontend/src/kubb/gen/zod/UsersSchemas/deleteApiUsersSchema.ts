import type {
  DeleteApiUsersHeaderParams,
  DeleteApiUsers200,
  DeleteApiUsers400,
  DeleteApiUsers404,
  DeleteApiUsers500,
  DeleteApiUsersMutationRequest,
  DeleteApiUsersMutationResponse,
} from "../../types/'UsersController/DeleteApiUsers.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const deleteApiUsersHeaderParamsSchema = z
  .object({
    Authorization: z.string().describe('Bearer token required if no access token cookie is set').optional(),
  })
  .optional() as unknown as ToZod<DeleteApiUsersHeaderParams>

/**
 * @description Users deletion successful
 */
export const deleteApiUsers200Schema = z.object({
  result: z.object({
    message: z.string(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<DeleteApiUsers200>

/**
 * @description Users deletion validation error
 */
export const deleteApiUsers400Schema = z.object({
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
}) as unknown as ToZod<DeleteApiUsers400>

/**
 * @description Users deletion not found error
 */
export const deleteApiUsers404Schema = z.object({
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
}) as unknown as ToZod<DeleteApiUsers404>

/**
 * @description Users deletion internal server error
 */
export const deleteApiUsers500Schema = z.object({
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
}) as unknown as ToZod<DeleteApiUsers500>

export const deleteApiUsersMutationRequestSchema = z.object({
  id: z.string(),
}) as unknown as ToZod<DeleteApiUsersMutationRequest>

export const deleteApiUsersMutationResponseSchema = z.lazy(() => deleteApiUsers200Schema) as unknown as ToZod<DeleteApiUsersMutationResponse>