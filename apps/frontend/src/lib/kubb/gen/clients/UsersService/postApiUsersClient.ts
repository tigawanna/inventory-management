import client from '@/lib/kubb/custom-fetch-client.ts'
import type {
  PostApiUsersMutationRequest,
  PostApiUsersMutationResponse,
  PostApiUsersHeaderParams,
  PostApiUsers400,
  PostApiUsers500,
} from "../../types/'UsersController/PostApiUsers.ts"
import type { RequestConfig, ResponseErrorConfig } from '@/lib/kubb/custom-fetch-client.ts'

export function getPostApiUsersUrlClient() {
  return `/api/users` as const
}

/**
 * {@link /api/users}
 */
export async function postApiUsersClient(
  data: PostApiUsersMutationRequest,
  headers?: PostApiUsersHeaderParams,
  config: Partial<RequestConfig<PostApiUsersMutationRequest>> = {},
) {
  const res = await client<PostApiUsersMutationResponse, ResponseErrorConfig<PostApiUsers400 | PostApiUsers500>, PostApiUsersMutationRequest>({
    method: 'POST',
    url: getPostApiUsersUrlClient().toString(),
    data,
    headers: { ...headers, ...config.headers },
    ...config,
  })
  return res
}