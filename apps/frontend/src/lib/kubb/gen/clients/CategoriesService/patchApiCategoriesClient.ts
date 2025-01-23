import client from '@/lib/kubb/custom-fetch-client.ts'
import type {
  PatchApiCategoriesMutationRequest,
  PatchApiCategoriesMutationResponse,
  PatchApiCategoriesHeaderParams,
  PatchApiCategories400,
  PatchApiCategories500,
} from "../../types/'CategoriesController/PatchApiCategories.ts"
import type { RequestConfig, ResponseErrorConfig } from '@/lib/kubb/custom-fetch-client.ts'

export function getPatchApiCategoriesUrlClient() {
  return `/api/categories` as const
}

/**
 * {@link /api/categories}
 */
export async function patchApiCategoriesClient(
  data: PatchApiCategoriesMutationRequest,
  headers?: PatchApiCategoriesHeaderParams,
  config: Partial<RequestConfig<PatchApiCategoriesMutationRequest>> = {},
) {
  const res = await client<
    PatchApiCategoriesMutationResponse,
    ResponseErrorConfig<PatchApiCategories400 | PatchApiCategories500>,
    PatchApiCategoriesMutationRequest
  >({ method: 'PATCH', url: getPatchApiCategoriesUrlClient().toString(), data, headers: { ...headers, ...config.headers }, ...config })
  return res
}