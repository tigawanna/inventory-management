
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import ResponsivePagination from "react-responsive-pagination";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { UpdateInventoryform } from "@/routes/inventory/-components/form/update";
import { inventoryListQueryOptions } from "@/routes/inventory/-query-options/inventory-query-option";

interface InventoryListProps {
  keyword?: string;
}

export function InventoryList({ keyword = "" }: InventoryListProps) {
  const { page,updatePage } = usePageSearchQuery("/inventory");
  const query = useSuspenseQuery(inventoryListQueryOptions({ keyword,page }));
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
  return (
    <div className="w-full h-full flex flex-col items-center justify-between ">
      <ul className="w-[95%] min-h-[80vh] flex flex-wrap justify-center p-2 gap-2">
        {data.items.map((item) => {
          return (
            <li
              key={item.id}
              className="h-56 w-[95%] sm:w-[45%] lg:w-[30%] rounded-xl bg-base-300 p-4 flex justify-center items-center gap-2 "
            >
              <div className="flex flex-col gap-2 w-full h-full justify-between">
              <div className="flex  gap-2 w-full h-full justify-between">
              <h1 className="text-2xl font-bold">
              {item.id}
              </h1>
              <UpdateInventoryform item={item} />
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


