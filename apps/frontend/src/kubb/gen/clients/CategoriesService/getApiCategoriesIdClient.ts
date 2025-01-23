import client from '@kubb/plugin-client/clients/fetch'
import type {
  GetApiCategoriesIdQueryResponse,
  GetApiCategoriesIdPathParams,
  GetApiCategoriesId400,
  GetApiCategoriesId404,
  GetApiCategoriesId500,
} from "../../types/'CategoriesController/GetApiCategoriesId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getGetApiCategoriesIdUrlClient({ id }: { id: GetApiCategoriesIdPathParams['id'] }) {
  return `/api/categories/:id` as const
}

/**
 * {@link /api/categories/:id}
 */
export async function getApiCategoriesIdClient({ id }: { id: GetApiCategoriesIdPathParams['id'] }, config: Partial<RequestConfig> = {}) {
  const res = await client<
    GetApiCategoriesIdQueryResponse,
    ResponseErrorConfig<GetApiCategoriesId400 | GetApiCategoriesId404 | GetApiCategoriesId500>,
    unknown
  >({ method: 'GET', url: getGetApiCategoriesIdUrlClient({ id }).toString(), ...config })
  return res
}