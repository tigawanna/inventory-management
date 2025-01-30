import type {
  PostApiAuthSignout200,
  PostApiAuthSignout400,
  PostApiAuthSignout500,
  PostApiAuthSignoutMutationResponse,
} from "../../types/'AuthController/PostApiAuthSignout.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

/**
 * @description User signed out successfully
 */
export const postApiAuthSignout200Schema = z.object({
  result: z.object({
    message: z.string(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<PostApiAuthSignout200>

/**
 * @description User signed out validation error
 */
export const postApiAuthSignout400Schema = z.object({
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
}) as unknown as ToZod<PostApiAuthSignout400>

/**
 * @description User signed out internal error
 */
export const postApiAuthSignout500Schema = z.object({
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
}) as unknown as ToZod<PostApiAuthSignout500>

export const postApiAuthSignoutMutationResponseSchema = z.lazy(() => postApiAuthSignout200Schema) as unknown as ToZod<PostApiAuthSignoutMutationResponse>