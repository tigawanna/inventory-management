import client from '@kubb/plugin-client/clients/fetch'
import type { PostApiAuthSignoutMutationResponse, PostApiAuthSignout400, PostApiAuthSignout500 } from "../../types/'AuthController/PostApiAuthSignout.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getPostApiAuthSignoutUrlClient() {
  return `/api/auth/signout` as const
}

/**
 * {@link /api/auth/signout}
 */
export async function postApiAuthSignoutClient(config: Partial<RequestConfig> = {}) {
  const res = await client<PostApiAuthSignoutMutationResponse, ResponseErrorConfig<PostApiAuthSignout400 | PostApiAuthSignout500>, unknown>({
    method: 'POST',
    url: getPostApiAuthSignoutUrlClient().toString(),
    ...config,
  })
  return res
}