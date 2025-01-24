import type { GetApiV1200, GetApiV1QueryResponse } from "../../types/'HomeController/GetApiV1.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

/**
 * @description Welcome to the Inventory API
 */
export const getApiV1200Schema = z.object({
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
}) as unknown as ToZod<GetApiV1200>

export const getApiV1QueryResponseSchema = z.lazy(() => getApiV1200Schema) as unknown as ToZod<GetApiV1QueryResponse>