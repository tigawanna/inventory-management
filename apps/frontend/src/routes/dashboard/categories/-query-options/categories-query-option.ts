import { categoriesService, GetApiCategoriesQueryParams } from "@/kubb/gen";
import { envVariables } from "@/lib/env";
import { queryOptions } from "@tanstack/react-query";


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
      const {data,status} = await categoriesService().getApiCategoriesClient({
        limit: "12",
        page,
        order,
        search: keyword,
        sort,
      },{baseURL:envVariables.VITE_API_URL,});
      console.log({status});
      const { result, error} = data;
      if(status === 4){
       error 
      }
      console.log({result,error});
      return result;
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
