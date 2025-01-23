import client from '@kubb/plugin-client/clients/fetch'
import type {
  PostApiAuthRequestPasswordResetMutationRequest,
  PostApiAuthRequestPasswordResetMutationResponse,
  PostApiAuthRequestPasswordReset400,
  PostApiAuthRequestPasswordReset404,
  PostApiAuthRequestPasswordReset500,
} from "../../types/'AuthController/PostApiAuthRequestPasswordReset.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getPostApiAuthRequestPasswordResetUrlClient() {
  return `/api/auth/request-password-reset` as const
}

/**
 * {@link /api/auth/request-password-reset}
 */
export async function postApiAuthRequestPasswordResetClient(
  data: PostApiAuthRequestPasswordResetMutationRequest,
  config: Partial<RequestConfig<PostApiAuthRequestPasswordResetMutationRequest>> = {},
) {
  const res = await client<
    PostApiAuthRequestPasswordResetMutationResponse,
    ResponseErrorConfig<PostApiAuthRequestPasswordReset400 | PostApiAuthRequestPasswordReset404 | PostApiAuthRequestPasswordReset500>,
    PostApiAuthRequestPasswordResetMutationRequest
  >({ method: 'POST', url: getPostApiAuthRequestPasswordResetUrlClient().toString(), data, ...config })
  return res
}