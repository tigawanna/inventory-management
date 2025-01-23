import client from '@kubb/plugin-client/clients/fetch'
import type {
  PatchApiInventoryMutationRequest,
  PatchApiInventoryMutationResponse,
  PatchApiInventoryHeaderParams,
  PatchApiInventory400,
  PatchApiInventory500,
} from "../../types/'InventoryController/PatchApiInventory.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getPatchApiInventoryUrlClient() {
  return `/api/inventory` as const
}

/**
 * {@link /api/inventory}
 */
export async function patchApiInventoryClient(
  data: PatchApiInventoryMutationRequest,
  headers?: PatchApiInventoryHeaderParams,
  config: Partial<RequestConfig<PatchApiInventoryMutationRequest>> = {},
) {
  const res = await client<
    PatchApiInventoryMutationResponse,
    ResponseErrorConfig<PatchApiInventory400 | PatchApiInventory500>,
    PatchApiInventoryMutationRequest
  >({ method: 'PATCH', url: getPatchApiInventoryUrlClient().toString(), data, headers: { ...headers, ...config.headers }, ...config })
  return res
}