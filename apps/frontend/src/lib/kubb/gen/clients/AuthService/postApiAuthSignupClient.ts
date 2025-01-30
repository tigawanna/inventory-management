import client from '@/lib/kubb/custom-fetch-client.ts'
import type {
  PostApiAuthSignupMutationRequest,
  PostApiAuthSignupMutationResponse,
  PostApiAuthSignup400,
  PostApiAuthSignup404,
  PostApiAuthSignup500,
} from "../../types/'AuthController/PostApiAuthSignup.ts"
import type { RequestConfig, ResponseErrorConfig } from '@/lib/kubb/custom-fetch-client.ts'

export function getPostApiAuthSignupUrlClient() {
  return `/api/auth/signup` as const
}

/**
 * {@link /api/auth/signup}
 */
export async function postApiAuthSignupClient(data: PostApiAuthSignupMutationRequest, config: Partial<RequestConfig<PostApiAuthSignupMutationRequest>> = {}) {
  const res = await client<
    PostApiAuthSignupMutationResponse,
    ResponseErrorConfig<PostApiAuthSignup400 | PostApiAuthSignup404 | PostApiAuthSignup500>,
    PostApiAuthSignupMutationRequest
  >({ method: 'POST', url: getPostApiAuthSignupUrlClient().toString(), data, ...config })
  return res
}