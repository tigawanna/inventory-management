import client from '@kubb/plugin-client/clients/fetch'
import type {
  DeleteApiInventoryMutationRequest,
  DeleteApiInventoryMutationResponse,
  DeleteApiInventoryHeaderParams,
  DeleteApiInventory400,
  DeleteApiInventory404,
  DeleteApiInventory500,
} from "../../types/'InventoryController/DeleteApiInventory.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

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