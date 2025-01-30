import client from '@/lib/kubb/custom-fetch-client.ts'
import type {
  PostApiCategoriesMutationRequest,
  PostApiCategoriesMutationResponse,
  PostApiCategoriesHeaderParams,
  PostApiCategories400,
  PostApiCategories500,
} from "../../types/'CategoriesController/PostApiCategories.ts"
import type { RequestConfig, ResponseErrorConfig } from '@/lib/kubb/custom-fetch-client.ts'

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