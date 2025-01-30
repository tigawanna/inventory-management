import client from '@/lib/kubb/custom-fetch-client.ts'
import type { GetApiUsersQueryResponse, GetApiUsersQueryParams, GetApiUsers400, GetApiUsers500 } from "../../types/'UsersController/GetApiUsers.ts"
import type { RequestConfig, ResponseErrorConfig } from '@/lib/kubb/custom-fetch-client.ts'

export function getGetApiUsersUrlClient() {
  return `/api/users` as const
}

/**
 * {@link /api/users}
 */
export async function getApiUsersClient(params?: GetApiUsersQueryParams, config: Partial<RequestConfig> = {}) {
  const res = await client<GetApiUsersQueryResponse, ResponseErrorConfig<GetApiUsers400 | GetApiUsers500>, unknown>({
    method: 'GET',
    url: getGetApiUsersUrlClient().toString(),
    params,
    ...config,
  })
  return res
}