import client from '@kubb/plugin-client/clients/fetch'
import type {
  GetApiInventoryQueryResponse,
  GetApiInventoryQueryParams,
  GetApiInventory400,
  GetApiInventory500,
} from "../../types/'InventoryController/GetApiInventory.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getGetApiInventoryUrlClient() {
  return `/api/inventory` as const
}

/**
 * {@link /api/inventory}
 */
export async function getApiInventoryClient(params?: GetApiInventoryQueryParams, config: Partial<RequestConfig> = {}) {
  const res = await client<GetApiInventoryQueryResponse, ResponseErrorConfig<GetApiInventory400 | GetApiInventory500>, unknown>({
    method: 'GET',
    url: getGetApiInventoryUrlClient().toString(),
    params,
    ...config,
  })
  return res
}