import client from '@kubb/plugin-client/clients/fetch'
import type {
  PostApiCategoriesMutationRequest,
  PostApiCategoriesMutationResponse,
  PostApiCategoriesHeaderParams,
  PostApiCategories400,
  PostApiCategories500,
} from "../../types/'CategoriesController/PostApiCategories.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getPostApiCategoriesUrlClient() {
  return `/api/categories` as const
}

/**
 * {@link /api/categories}
 */
export async function postApiCategoriesClient(
  data: PostApiCategoriesMutationRequest,
  headers?: PostApiCategoriesHeaderParams,
  config: Partial<RequestConfig<PostApiCategoriesMutationRequest>> = {},
) {
  const res = await client<
    PostApiCategoriesMutationResponse,
    ResponseErrorConfig<PostApiCategories400 | PostApiCategories500>,
    PostApiCategoriesMutationRequest
  >({ method: 'POST', url: getPostApiCategoriesUrlClient().toString(), data, headers: { ...headers, ...config.headers }, ...config })
  return res
}