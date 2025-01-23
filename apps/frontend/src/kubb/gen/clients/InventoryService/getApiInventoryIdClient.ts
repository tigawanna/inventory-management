import client from '@kubb/plugin-client/clients/fetch'
import type {
  GetApiInventoryIdQueryResponse,
  GetApiInventoryIdPathParams,
  GetApiInventoryId400,
  GetApiInventoryId404,
  GetApiInventoryId500,
} from "../../types/'InventoryController/GetApiInventoryId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getGetApiInventoryIdUrlClient({ id }: { id: GetApiInventoryIdPathParams['id'] }) {
  return `/api/inventory/:id` as const
}

/**
 * {@link /api/inventory/:id}
 */
export async function getApiInventoryIdClient({ id }: { id: GetApiInventoryIdPathParams['id'] }, config: Partial<RequestConfig> = {}) {
  const res = await client<GetApiInventoryIdQueryResponse, ResponseErrorConfig<GetApiInventoryId400 | GetApiInventoryId404 | GetApiInventoryId500>, unknown>({
    method: 'GET',
    url: getGetApiInventoryIdUrlClient({ id }).toString(),
    ...config,
  })
  return res
}