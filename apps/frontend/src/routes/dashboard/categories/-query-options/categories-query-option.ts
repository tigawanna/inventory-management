import { categoriesService, GetApiCategoriesQueryParams } from "@/lib/kubb/gen";
import { envVariables } from "@/lib/env";
import { queryOptions } from "@tanstack/react-query";
import { makeHotToast } from "@/components/toasters";


interface categoriesQueryOptionPropss extends GetApiCategoriesQueryParams {
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
      const response = await categoriesService().getApiCategoriesClient({
        limit: "12",
        page,
        order,
        search: keyword,
        sort,
      });
      if(response.type === "error"){
        makeHotToast({
          title: "Error fetching records",
          description: response.statusText,
          variant: "error",
        })
        return {
          page,
          perPage: 0,
          totaleItems: 0,
          totalPages: 0,
          items: [],
        }
      }
      return response.data;
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
