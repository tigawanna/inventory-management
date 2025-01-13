import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { inventoryListQueryOptions } from "../../-query-options/inventory-query-option";
import ResponsivePagination from "react-responsive-pagination";
import { InventoryList } from "./InventoryList";
import { InventoryTable } from "./InventoryTable";

interface InventoriesContainerProps {
  keyword: string;
}

export function InventoriesContainer({ keyword }: InventoriesContainerProps) {
  const { page, updatePage } = usePageSearchQuery("/dashboard/inventory");
  const sp = useSearch({ from: "/dashboard/inventory/" });
  const query = useSuspenseQuery(
    inventoryListQueryOptions({ ...sp, keyword, page }),
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
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="hidden w-full max-w-[99vw] lg:flex">
        <InventoryTable items={items} />
      </div>
      <div className="flex w-full lg:hidden">
        <InventoryList items={items} />
      </div>
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
