import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { categoriesListQueryOptions } from "../../-query-options/categories-query-option";
import { CategoryTable } from "./CategoryTable";
import { CategoriesList } from "./CategoriesList";
import ResponsivePagination from "react-responsive-pagination";
import { DEFAULT_PAGE_SIZE } from "@/utils/constnants";
import { useState } from "react";
import { CategoryItem } from "../types";

interface CategoriesContainerProps {
  keyword: string;
}

export function CategoriesContainer({ keyword }: CategoriesContainerProps) {
  const [selected,setSelected] = useState<never[] | CategoryItem[]>([])
  const { page, updatePage } = usePageSearchQuery("/dashboard/categories");
  const sq = useSearch({ from: "/dashboard/categories/" });
  const query = useSuspenseQuery(
    categoriesListQueryOptions({
      ...sq,
      sort: sq.sort ?? "created_at",
      keyword,
      page,
      limit: sq.limit,
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
  const items = data.items;
  return (
    <div className="flex h-full w-full flex-col items-center gap-5">
      <div className="hidden w-full max-w-[99vw] lg:flex">
        <CategoryTable
          items={items}
          selected={selected}
          setSelected={setSelected}
          maxSelect={1}
        />
      </div>
      <div className="flex w-full lg:hidden">
        <CategoriesList
          items={items}
          selected={selected}
          setSelected={setSelected}
          maxSelect={1}
        />
      </div>
      <div className="flex w-full items-center justify-center">
        <ResponsivePagination
          current={page ?? 1}
          total={data.totalPages ?? -1}
          onPageChange={(e) => {
            updatePage(e);
          }}
        />
      </div>
    </div>
  );
}
