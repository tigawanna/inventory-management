import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { useSuspenseQuery } from "@tanstack/react-query";
import ResponsivePagination from "react-responsive-pagination";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { UpdateCategoriesform } from "@/routes/dashboard/categories/-components/form/update";
import { categoriesListQueryOptions } from "@/routes/dashboard/categories/-query-options/categories-query-option";
import { useSearch } from "@tanstack/react-router";

interface CategoriesListProps {
  keyword?: string;
}

export function CategoriesList({ keyword = "" }: CategoriesListProps) {
  const { page, updatePage } = usePageSearchQuery("/dashboard/categories");
  const sq = useSearch({ from: "/dashboard/categories/" });
  const query = useSuspenseQuery(
    categoriesListQueryOptions({
      ...sq,
      keyword,
      page,
      limit: sq.limit ?? "10",
      order: sq.order ?? "desc",
    }),
  );
  const data = query.data;
  const error = query.error;

  if (error) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <ErrorWrapper err={error} />
      </div>
    );
  }
  if (!data || data.items.length === 0) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <ItemNotFound label="Categories" />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <ul className="flex min-h-[80vh] w-[95%] flex-wrap justify-center gap-2 p-2">
        {data.items.map((item) => {
          return (
            <li
              key={item.id}
              className="flex h-56 w-[95%] items-center justify-center gap-2 rounded-xl bg-base-300 p-4 sm:w-[45%] lg:w-[30%]"
            >
              <div className="flex h-full w-full flex-col justify-between gap-2">
                <div className="flex h-full w-full justify-between gap-2">
                  <h1 className="text-2xl font-bold">{item.id}</h1>
                  <UpdateCategoriesform item={item} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex w-full items-center justify-center">
        <ResponsivePagination
          current={page ?? 1}
          total={data.totalPages}
          onPageChange={(e) => {
            updatePage(e);
          }}
        />
      </div>
    </div>
  );
}
