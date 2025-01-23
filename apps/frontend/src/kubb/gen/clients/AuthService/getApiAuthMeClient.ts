import client from '@kubb/plugin-client/clients/fetch'
import type { GetApiAuthMeQueryResponse, GetApiAuthMe400, GetApiAuthMe404, GetApiAuthMe500 } from "../../types/'AuthController/GetApiAuthMe.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getGetApiAuthMeUrlClient() {
  return `/api/auth/me` as const
}

/**
 * {@link /api/auth/me}
 */
export async function getApiAuthMeClient(config: Partial<RequestConfig> = {}) {
  const res = await client<GetApiAuthMeQueryResponse, ResponseErrorConfig<GetApiAuthMe400 | GetApiAuthMe404 | GetApiAuthMe500>, unknown>({
    method: 'GET',
    url: getGetApiAuthMeUrlClient().toString(),
    ...config,
  })
  return res
}