import client from '@/lib/kubb/custom-fetch-client.ts'
import type {
  DeleteApiUsersMutationRequest,
  DeleteApiUsersMutationResponse,
  DeleteApiUsersHeaderParams,
  DeleteApiUsers400,
  DeleteApiUsers404,
  DeleteApiUsers500,
} from "../../types/'UsersController/DeleteApiUsers.ts"
import type { RequestConfig, ResponseErrorConfig } from '@/lib/kubb/custom-fetch-client.ts'

export function getDeleteApiUsersUrlClient() {
  return `/api/users` as const
}

/**
 * {@link /api/users}
 */
export async function deleteApiUsersClient(
  data: DeleteApiUsersMutationRequest,
  headers?: DeleteApiUsersHeaderParams,
  config: Partial<RequestConfig<DeleteApiUsersMutationRequest>> = {},
) {
  const res = await client<
    DeleteApiUsersMutationResponse,
    ResponseErrorConfig<DeleteApiUsers400 | DeleteApiUsers404 | DeleteApiUsers500>,
    DeleteApiUsersMutationRequest
  >({ method: 'DELETE', url: getDeleteApiUsersUrlClient().toString(), data, headers: { ...headers, ...config.headers }, ...config })
  return res
}