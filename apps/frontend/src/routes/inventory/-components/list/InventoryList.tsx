import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import ResponsivePagination from "react-responsive-pagination";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { UpdateInventoryform } from "@/routes/inventory/-components/form/update";
import { inventoryListQueryOptions } from "@/routes/inventory/-query-options/inventory-query-option";
import { DeleteInventoryForm } from "../form/delete";

interface InventoryListProps {
  keyword?: string;
}

export function InventoryList({ keyword = "" }: InventoryListProps) {
  const { page, updatePage } = usePageSearchQuery("/inventory");
  const sp = useSearch({ from: "/inventory/" });
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
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <ul className="flex min-h-[80vh] w-[95%] flex-wrap justify-center gap-2 p-2">
        {data.items.map((item) => {
          return (
            <li
              key={item.id}
              className="h flex w-[95%] items-center justify-center gap-2 rounded-xl bg-base-300 p-4 sm:w-[45%] lg:w-[30%]"
            >
              <div className="flex h-full w-full flex-col justify-between gap-2">
                <div className="flex h-full w-full justify-between gap-2">
                  <h1 className="text-2xl font-bold">{item.name}</h1>
                  <UpdateInventoryform item={item} />
                </div>
                <p>{item.description}</p>
                <div className="flex flex-wrap justify-between gap-2">
                  <div>Price: {item.price}</div>
                  <div>Quan: {item.quantity}</div>
                </div>
                <div className="flex flex-wrap justify-between gap-2 text-sm">
                  <div>{item.categoryId}</div>
                  <div>SKU: {item.sku}</div>
                  <DeleteInventoryForm id={item.id} />
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
