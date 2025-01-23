import { deleteApiCategoriesClient } from './deleteApiCategoriesClient.ts'
import { getApiCategoriesClient } from './getApiCategoriesClient.ts'
import { getApiCategoriesIdClient } from './getApiCategoriesIdClient.ts'
import { patchApiCategoriesClient } from './patchApiCategoriesClient.ts'
import { postApiCategoriesClient } from './postApiCategoriesClient.ts'

export function categoriesService() {
  return { getApiCategoriesClient, postApiCategoriesClient, patchApiCategoriesClient, deleteApiCategoriesClient, getApiCategoriesIdClient }
}