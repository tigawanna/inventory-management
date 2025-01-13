import { BaseCrudApi, ListQueryParams } from "./base";


export interface CategoryItem {
  id: string;
  name: string;
  description: string | null;
  updated_at: string | null;
  created_at: string | null;
}
interface CreateCategoryItem {
  name: string;
  description?: string | null | undefined;
  updated_at?: string | null | undefined;
  created_at?: string | null | undefined;
}
export const categorySortBy = ["name", "description", "created_at"] as const satisfies Array<keyof CategoryItem>

export interface ListCategoryQueryParams extends ListQueryParams {
  sort?: typeof categorySortBy[number] | undefined;
}

export class CategoryApi extends BaseCrudApi<CategoryItem, CreateCategoryItem, ListCategoryQueryParams> {
  constructor() {
    super(import.meta.env.VITE_API_URL, {
      list: "/api/v1/categories",
      create: "/api/v1/categories",
      view: (id) => `/api/v1/categories/${id}`,
      update: (id) => `/api/v1/categories/${id}`,
      delete: (id) => `/api/v1/categories/${id}`,
    });
  }
}

export const categoryApi = new CategoryApi();
