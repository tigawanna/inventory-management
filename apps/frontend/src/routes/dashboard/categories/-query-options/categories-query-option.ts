 
import { queryOptions } from "@tanstack/react-query";


interface categoriesQueryOptionPropss {
  keyword: string;
    page?: number;
}
export function categoriesListQueryOptions({ keyword, page=1 }: categoriesQueryOptionPropss) {
  return queryOptions({
    queryKey: ["categories_list", keyword,page],
    queryFn: () => {
      return new Promise<{
          page: number;
          perPage: number;
          totaleItems: number;
          totalPages: number;
        items: Array<Record<string, any> & { id: string }>;
      }>((res) => {
        setTimeout(() => {
          const resArray = Array.from({ length: 30 }, (_, i) => ({
            id: "categories_id_"+i,
          }));
          res({
            page,
            perPage: 10,
            totaleItems: 30,
            totalPages: 3,
             items: resArray
            .slice((page - 1) * 10, page * 10)
            .filter((item) =>item.id.includes(keyword))
          });
        }, 1000);
      });
    },
  });
}
interface oneCategoriesQueryOptionPropss {
  categories: string;
}
export function oneCategoriesQueryOptions({ categories }: oneCategoriesQueryOptionPropss) {
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
  