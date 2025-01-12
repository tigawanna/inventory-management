import { makeHotToast } from "@/components/toasters";
import { categoryApi, ListCategoryQueryParams } from "@/lib/api/category";
import { queryOptions } from "@tanstack/react-query";

interface categoriesQueryOptionPropss extends ListCategoryQueryParams {
  keyword: string;
}
export function categoriesListQueryOptions({
  keyword,
  page = "1",
  limit = "10",
  order = "desc",
  sort = "name",
}: categoriesQueryOptionPropss) {
  return queryOptions({
    queryKey: ["categories_list", keyword, page, limit, order, sort],
    queryFn: async () => {
      const { record, error } = await categoryApi.list({
        limit: "10",
        page,
        order: "desc",
        search: keyword,
        sort: "name",
      });
      if (error) {
        makeHotToast({
          title: "something went wrong fetching categories",
          description: error.message,
          variant: "error",
        })
        return {
          page,
          perPage: 10,
          totaleItems: 0,
          totalPages: 0,
          items: [],
        };
      }
      return record;
    },
    staleTime: 1000,
  });
}
interface oneCategoriesQueryOptionPropss {
  categories: string;
}
export function oneCategoriesQueryOptions({
  categories,
}: oneCategoriesQueryOptionPropss) {
  return queryOptions({
    queryKey: ["one_categories", categories],
    queryFn: () => {
      return new Promise<{ id: string }>((res) => {
        setTimeout(() => {
          res({
            id: categories,
          });
        }, 1000);
      });
    },
  });
}
