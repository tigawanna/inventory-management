import client from '@/lib/kubb/custom-fetch-client.ts'
import type {
  DeleteApiInventoryMutationRequest,
  DeleteApiInventoryMutationResponse,
  DeleteApiInventoryHeaderParams,
  DeleteApiInventory400,
  DeleteApiInventory404,
  DeleteApiInventory500,
} from "../../types/'InventoryController/DeleteApiInventory.ts"
import type { RequestConfig, ResponseErrorConfig } from '@/lib/kubb/custom-fetch-client.ts'

export function getDeleteApiInventoryUrlClient() {
  return `/api/inventory` as const
}

/**
 * {@link /api/inventory}
 */
export async function deleteApiInventoryClient(
  data: DeleteApiInventoryMutationRequest,
  headers?: DeleteApiInventoryHeaderParams,
  config: Partial<RequestConfig<DeleteApiInventoryMutationRequest>> = {},
) {
  const res = await client<
    DeleteApiInventoryMutationResponse,
    ResponseErrorConfig<DeleteApiInventory400 | DeleteApiInventory404 | DeleteApiInventory500>,
    DeleteApiInventoryMutationRequest
  >({ method: 'DELETE', url: getDeleteApiInventoryUrlClient().toString(), data, headers: { ...headers, ...config.headers }, ...config })
  return res
}