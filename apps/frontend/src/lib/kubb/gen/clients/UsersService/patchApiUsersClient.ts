import client from '@/lib/kubb/custom-fetch-client.ts'
import type {
  PatchApiUsersMutationRequest,
  PatchApiUsersMutationResponse,
  PatchApiUsersHeaderParams,
  PatchApiUsers400,
  PatchApiUsers500,
} from "../../types/'UsersController/PatchApiUsers.ts"
import type { RequestConfig, ResponseErrorConfig } from '@/lib/kubb/custom-fetch-client.ts'

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