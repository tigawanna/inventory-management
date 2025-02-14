import client from '@/lib/kubb/custom-fetch-client.ts'
import type {
  GetApiCategoriesQueryResponse,
  GetApiCategoriesQueryParams,
  GetApiCategories400,
  GetApiCategories500,
} from "../../types/'CategoriesController/GetApiCategories.ts"
import type { RequestConfig, ResponseErrorConfig } from '@/lib/kubb/custom-fetch-client.ts'

export function getGetApiCategoriesUrlClient() {
  return `/api/categories` as const
}

/**
 * {@link /api/categories}
 */
export async function getApiCategoriesClient(params?: GetApiCategoriesQueryParams, config: Partial<RequestConfig> = {}) {
  const res = await client<GetApiCategoriesQueryResponse, ResponseErrorConfig<GetApiCategories400 | GetApiCategories500>, unknown>({
    method: 'GET',
    url: getGetApiCategoriesUrlClient().toString(),
    params,
    ...config,
  })
  return res
}