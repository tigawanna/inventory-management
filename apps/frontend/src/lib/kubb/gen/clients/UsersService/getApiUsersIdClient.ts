import client from '@/lib/kubb/custom-fetch-client.ts'
import type {
  GetApiUsersIdQueryResponse,
  GetApiUsersIdPathParams,
  GetApiUsersId400,
  GetApiUsersId404,
  GetApiUsersId500,
} from "../../types/'UsersController/GetApiUsersId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@/lib/kubb/custom-fetch-client.ts'

export function getGetApiUsersIdUrlClient({ id }: { id: GetApiUsersIdPathParams['id'] }) {
  return `/api/users/:id` as const
}

/**
 * {@link /api/users/:id}
 */
export async function getApiUsersIdClient({ id }: { id: GetApiUsersIdPathParams['id'] }, config: Partial<RequestConfig> = {}) {
  const res = await client<GetApiUsersIdQueryResponse, ResponseErrorConfig<GetApiUsersId400 | GetApiUsersId404 | GetApiUsersId500>, unknown>({
    method: 'GET',
    url: getGetApiUsersIdUrlClient({ id }).toString(),
    ...config,
  })
  return res
}