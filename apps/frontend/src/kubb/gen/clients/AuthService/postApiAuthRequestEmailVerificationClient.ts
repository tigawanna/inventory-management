import client from '@kubb/plugin-client/clients/fetch'
import type {
  PostApiAuthRequestEmailVerificationMutationRequest,
  PostApiAuthRequestEmailVerificationMutationResponse,
  PostApiAuthRequestEmailVerification400,
  PostApiAuthRequestEmailVerification404,
  PostApiAuthRequestEmailVerification500,
} from "../../types/'AuthController/PostApiAuthRequestEmailVerification.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getPostApiAuthRequestEmailVerificationUrlClient() {
  return `/api/auth/request-email-verification` as const
}

/**
 * {@link /api/auth/request-email-verification}
 */
export async function postApiAuthRequestEmailVerificationClient(
  data: PostApiAuthRequestEmailVerificationMutationRequest,
  config: Partial<RequestConfig<PostApiAuthRequestEmailVerificationMutationRequest>> = {},
) {
  const res = await client<
    PostApiAuthRequestEmailVerificationMutationResponse,
    ResponseErrorConfig<PostApiAuthRequestEmailVerification400 | PostApiAuthRequestEmailVerification404 | PostApiAuthRequestEmailVerification500>,
    PostApiAuthRequestEmailVerificationMutationRequest
  >({ method: 'POST', url: getPostApiAuthRequestEmailVerificationUrlClient().toString(), data, ...config })
  return res
}