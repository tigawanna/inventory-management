import client from '@kubb/plugin-client/clients/fetch'
import type {
  PostApiInventoryMutationRequest,
  PostApiInventoryMutationResponse,
  PostApiInventoryHeaderParams,
  PostApiInventory400,
  PostApiInventory500,
} from "../../types/'InventoryController/PostApiInventory.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getPostApiInventoryUrlClient() {
  return `/api/inventory` as const
}

/**
 * {@link /api/inventory}
 */
export async function postApiInventoryClient(
  data: PostApiInventoryMutationRequest,
  headers?: PostApiInventoryHeaderParams,
  config: Partial<RequestConfig<PostApiInventoryMutationRequest>> = {},
) {
  const res = await client<PostApiInventoryMutationResponse, ResponseErrorConfig<PostApiInventory400 | PostApiInventory500>, PostApiInventoryMutationRequest>({
    method: 'POST',
    url: getPostApiInventoryUrlClient().toString(),
    data,
    headers: { ...headers, ...config.headers },
    ...config,
  })
  return res
}