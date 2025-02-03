// import { BaseCrudApi, ListQueryParams } from "./base";


// export interface CategoryItem {
//   id: string;
//   name: string;
//   description: string | null;
//   updated_at: string | null;
//   created_at: string | null;
// }
// interface CreateCategoryItem {
//   name: string;
//   description?: string | null | undefined;
//   updated_at?: string | null | undefined;
//   created_at?: string | null | undefined;
// }
// export const categorySortBy = ["name", "description", "created_at"] as const satisfies Array<keyof CategoryItem>

// export interface ListCategoryQueryParams extends ListQueryParams {
//   sort?: typeof categorySortBy[number] | undefined;
// }

// export class CategoryApi extends BaseCrudApi<CategoryItem, CreateCategoryItem, ListCategoryQueryParams> {
//   constructor() {
//     super(import.meta.env.VITE_API_URL, {
//       list: "/api/categories",
//       create: "/api/categories",
//       view: (id) => `/api/categories/${id}`,
//       update: (id) => `/api/categories/${id}`,
//       delete: (id) => `/api/categories/${id}`,
//     });
//   }
// }

// export const categoryApi = new CategoryApi();
