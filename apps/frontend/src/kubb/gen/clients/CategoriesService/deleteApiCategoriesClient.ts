import client from '@kubb/plugin-client/clients/fetch'
import type {
  DeleteApiCategoriesMutationRequest,
  DeleteApiCategoriesMutationResponse,
  DeleteApiCategoriesHeaderParams,
  DeleteApiCategories400,
  DeleteApiCategories404,
  DeleteApiCategories500,
} from "../../types/'CategoriesController/DeleteApiCategories.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getDeleteApiCategoriesUrlClient() {
  return `/api/categories` as const
}

/**
 * {@link /api/categories}
 */
export async function deleteApiCategoriesClient(
  data: DeleteApiCategoriesMutationRequest,
  headers?: DeleteApiCategoriesHeaderParams,
  config: Partial<RequestConfig<DeleteApiCategoriesMutationRequest>> = {},
) {
  const res = await client<
    DeleteApiCategoriesMutationResponse,
    ResponseErrorConfig<DeleteApiCategories400 | DeleteApiCategories404 | DeleteApiCategories500>,
    DeleteApiCategoriesMutationRequest
  >({ method: 'DELETE', url: getDeleteApiCategoriesUrlClient().toString(), data, headers: { ...headers, ...config.headers }, ...config })
  return res
}