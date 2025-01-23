import client from '@/lib/kubb/custom-fetch-client.ts'
import type {
  PostApiAuthVerifyEmailMutationRequest,
  PostApiAuthVerifyEmailMutationResponse,
  PostApiAuthVerifyEmail400,
  PostApiAuthVerifyEmail404,
  PostApiAuthVerifyEmail500,
} from "../../types/'AuthController/PostApiAuthVerifyEmail.ts"
import type { RequestConfig, ResponseErrorConfig } from '@/lib/kubb/custom-fetch-client.ts'

export function getPostApiAuthVerifyEmailUrlClient() {
  return `/api/auth/verify-email` as const
}

/**
 * {@link /api/auth/verify-email}
 */
export async function postApiAuthVerifyEmailClient(
  data?: PostApiAuthVerifyEmailMutationRequest,
  config: Partial<RequestConfig<PostApiAuthVerifyEmailMutationRequest>> = {},
) {
  const res = await client<
    PostApiAuthVerifyEmailMutationResponse,
    ResponseErrorConfig<PostApiAuthVerifyEmail400 | PostApiAuthVerifyEmail404 | PostApiAuthVerifyEmail500>,
    PostApiAuthVerifyEmailMutationRequest
  >({ method: 'POST', url: getPostApiAuthVerifyEmailUrlClient().toString(), data, ...config })
  return res
}