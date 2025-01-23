import client from '@kubb/plugin-client/clients/fetch'
import type {
  PatchApiUsersMutationRequest,
  PatchApiUsersMutationResponse,
  PatchApiUsersHeaderParams,
  PatchApiUsers400,
  PatchApiUsers500,
} from "../../types/'UsersController/PatchApiUsers.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getPatchApiUsersUrlClient() {
  return `/api/users` as const
}

/**
 * {@link /api/users}
 */
export async function patchApiUsersClient(
  data: PatchApiUsersMutationRequest,
  headers?: PatchApiUsersHeaderParams,
  config: Partial<RequestConfig<PatchApiUsersMutationRequest>> = {},
) {
  const res = await client<PatchApiUsersMutationResponse, ResponseErrorConfig<PatchApiUsers400 | PatchApiUsers500>, PatchApiUsersMutationRequest>({
    method: 'PATCH',
    url: getPatchApiUsersUrlClient().toString(),
    data,
    headers: { ...headers, ...config.headers },
    ...config,
  })
  return res
}