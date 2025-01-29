import type {
  PatchApiUsersHeaderParams,
  PatchApiUsers200,
  PatchApiUsers400,
  PatchApiUsers500,
  PatchApiUsersMutationRequest,
  PatchApiUsersMutationResponse,
} from "../../types/'UsersController/PatchApiUsers.ts"
import type { ToZod } from '@kubb/plugin-zod/utils'
import { z } from 'zod'

export const patchApiUsersHeaderParamsSchema = z
  .object({
    Authorization: z.string().describe('Bearer token required if no access token cookie is set').optional(),
  })
  .optional() as unknown as ToZod<PatchApiUsersHeaderParams>

/**
 * @description Users update successful
 */
export const patchApiUsers200Schema = z.object({
  result: z.object({
    id: z.string(),
    updated_at: z.string().nullable(),
    created_at: z.string().nullable(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    avatarUrl: z.string().nullable(),
    role: z.enum(['admin', 'user', 'suspended']).nullable(),
    refreshToken: z.string().nullable(),
    refreshTokenVersion: z.number().int().min(-2147483648).max(2147483647).nullable(),
    verificationToken: z.string().nullable(),
    isEmailVerified: z.boolean().nullable(),
    lastLoginAt: z.string().nullable(),
    metadata: z.object({}).catchall(z.unknown()).nullable(),
  }),
  error: z.unknown().nullish(),
}) as unknown as ToZod<PatchApiUsers200>

/**
 * @description Users update validation error
 */
export const patchApiUsers400Schema = z.object({
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
}) as unknown as ToZod<PatchApiUsers400>

/**
 * @description Users update internal server error
 */
export const patchApiUsers500Schema = z.object({
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
}) as unknown as ToZod<PatchApiUsers500>

export const patchApiUsersMutationRequestSchema = z.object({
  id: z.string(),
  updated_at: z.string().nullable().nullish(),
  created_at: z.string().nullable().nullish(),
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  avatarUrl: z.string().nullable().nullish(),
  role: z.enum(['admin', 'user', 'suspended']).nullable().nullish(),
  refreshToken: z.string().nullable().nullish(),
  refreshTokenVersion: z.number().int().min(-2147483648).max(2147483647).nullable().nullish(),
  verificationToken: z.string().nullable().nullish(),
  isEmailVerified: z.boolean().nullable().nullish(),
  lastLoginAt: z.string().nullable().nullish(),
  metadata: z.object({}).catchall(z.unknown()).nullable(),
}) as unknown as ToZod<PatchApiUsersMutationRequest>

export const patchApiUsersMutationResponseSchema = z.lazy(() => patchApiUsers200Schema) as unknown as ToZod<PatchApiUsersMutationResponse>