import client from '@/lib/kubb/custom-fetch-client.ts'
import type {
  PatchApiInventoryMutationRequest,
  PatchApiInventoryMutationResponse,
  PatchApiInventoryHeaderParams,
  PatchApiInventory400,
  PatchApiInventory500,
} from "../../types/'InventoryController/PatchApiInventory.ts"
import type { RequestConfig, ResponseErrorConfig } from '@/lib/kubb/custom-fetch-client.ts'

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