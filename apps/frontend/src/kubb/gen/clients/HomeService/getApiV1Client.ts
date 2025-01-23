import client from '@kubb/plugin-client/clients/fetch'
import type { GetApiV1QueryResponse } from "../../types/'HomeController/GetApiV1.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getGetApiV1UrlClient() {
  return `/api/v1` as const
}

/**
 * {@link /api/v1}
 */
export async function getApiV1Client(config: Partial<RequestConfig> = {}) {
  const res = await client<GetApiV1QueryResponse, ResponseErrorConfig<Error>, unknown>({ method: 'GET', url: getGetApiV1UrlClient().toString(), ...config })
  return res
}