import client from '@kubb/plugin-client/clients/fetch'
import type {
  PostApiAuthResetPasswordMutationRequest,
  PostApiAuthResetPasswordMutationResponse,
  PostApiAuthResetPassword400,
  PostApiAuthResetPassword404,
  PostApiAuthResetPassword500,
} from "../../types/'AuthController/PostApiAuthResetPassword.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getPostApiAuthResetPasswordUrlClient() {
  return `/api/auth/reset-password` as const
}

/**
 * {@link /api/auth/reset-password}
 */
export async function postApiAuthResetPasswordClient(
  data: PostApiAuthResetPasswordMutationRequest,
  config: Partial<RequestConfig<PostApiAuthResetPasswordMutationRequest>> = {},
) {
  const res = await client<
    PostApiAuthResetPasswordMutationResponse,
    ResponseErrorConfig<PostApiAuthResetPassword400 | PostApiAuthResetPassword404 | PostApiAuthResetPassword500>,
    PostApiAuthResetPasswordMutationRequest
  >({ method: 'POST', url: getPostApiAuthResetPasswordUrlClient().toString(), data, ...config })
  return res
}