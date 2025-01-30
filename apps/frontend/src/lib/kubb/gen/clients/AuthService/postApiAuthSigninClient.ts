import client from '@/lib/kubb/custom-fetch-client.ts'
import type {
  PostApiAuthSigninMutationRequest,
  PostApiAuthSigninMutationResponse,
  PostApiAuthSignin400,
  PostApiAuthSignin500,
} from "../../types/'AuthController/PostApiAuthSignin.ts"
import type { RequestConfig, ResponseErrorConfig } from '@/lib/kubb/custom-fetch-client.ts'

export function getPostApiAuthSigninUrlClient() {
  return `/api/auth/signin` as const
}

/**
 * {@link /api/auth/signin}
 */
export async function postApiAuthSigninClient(data: PostApiAuthSigninMutationRequest, config: Partial<RequestConfig<PostApiAuthSigninMutationRequest>> = {}) {
  const res = await client<
    PostApiAuthSigninMutationResponse,
    ResponseErrorConfig<PostApiAuthSignin400 | PostApiAuthSignin500>,
    PostApiAuthSigninMutationRequest
  >({ method: 'POST', url: getPostApiAuthSigninUrlClient().toString(), data, ...config })
  return res
}