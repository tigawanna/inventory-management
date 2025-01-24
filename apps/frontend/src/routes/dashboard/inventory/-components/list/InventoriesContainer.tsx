import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { useSuspenseQuery } from "@tanstack/react-query";
import { inventoryListQueryOptions, InventoryQueryVariables } from "../../-query-options/inventory-query-option";
import { InventoryList } from "./InventoryList";
import { InventoryTable } from "./InventoryTable";
import ResponsivePagination from "react-responsive-pagination";
import { useSearch } from "@tanstack/react-router";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
interface InventoriesContainerProps {
  keyword: string;
}

export function InventoriesContainer({ keyword }: InventoriesContainerProps) {
    const { page, updatePage } = usePageSearchQuery("/dashboard/inventory");
    const searchParams = useSearch({
      from: "/dashboard/inventory/",
    });
    const inventoryQueryVariables: InventoryQueryVariables = {
      basekey: "inventory_list",
      keyword: keyword ?? "",
      page: searchParams.page ?? 1,
      categoryId: searchParams.categoryId ?? "",
      limit: searchParams.limit ?? 12,
      order: searchParams.order ?? "desc",
      sort: searchParams.sort ?? "name",
    };
  const query = useSuspenseQuery(
    inventoryListQueryOptions(inventoryQueryVariables),
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
        <ItemNotFound label="Inventory" />
      </div>
    );
  }
  const items = data.items;
  const totalPages = data.totalPages;
  return (
    <div className="flex h-full w-full flex-col gap-4  ">
      <div className="hidden w-full max-w-[99vw] lg:flex ">
        <InventoryTable items={items} />
      </div>
      <div className="flex w-full lg:hidden">
        <InventoryList items={items} />
      </div>
      <ResponsivePagination
        current={page ?? 1}
        total={totalPages??-1}
        onPageChange={(e) => {
          updatePage(e);
        }}
      />
    </div>
  );
}
