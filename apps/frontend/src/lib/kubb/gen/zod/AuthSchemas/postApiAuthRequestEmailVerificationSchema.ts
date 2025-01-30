import type {
  PostApiAuthRequestEmailVerification200,
  PostApiAuthRequestEmailVerification400,
  PostApiAuthRequestEmailVerification404,
  PostApiAuthRequestEmailVerification500,
  PostApiAuthRequestEmailVerificationMutationRequest,
  PostApiAuthRequestEmailVerificationMutationResponse,
} from "../../types/'AuthController/PostApiAuthRequestEmailVerification.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

/**
 * @description Email verification request successful
 */
export const postApiAuthRequestEmailVerification200Schema = z.object({
  result: z.object({
    message: z.string(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<PostApiAuthRequestEmailVerification200>

/**
 * @description Email verification request validation error
 */
export const postApiAuthRequestEmailVerification400Schema = z.object({
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
}) as unknown as ToZod<PostApiAuthRequestEmailVerification400>

/**
 * @description Email verification request errorr : User not found
 */
export const postApiAuthRequestEmailVerification404Schema = z.object({
  result: z.unknown().nullish(),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
}) as unknown as ToZod<PostApiAuthRequestEmailVerification404>

/**
 * @description Email verification request internal error
 */
export const postApiAuthRequestEmailVerification500Schema = z.object({
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
}) as unknown as ToZod<PostApiAuthRequestEmailVerification500>

export const postApiAuthRequestEmailVerificationMutationRequestSchema = z.object({
  email: z.string().email(),
}) as unknown as ToZod<PostApiAuthRequestEmailVerificationMutationRequest>

export const postApiAuthRequestEmailVerificationMutationResponseSchema = z.lazy(
  () => postApiAuthRequestEmailVerification200Schema,
) as unknown as ToZod<PostApiAuthRequestEmailVerificationMutationResponse>