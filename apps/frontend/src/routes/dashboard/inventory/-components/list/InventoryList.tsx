import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { useSuspenseQuery } from "@tanstack/react-query";
import {  useSearch } from "@tanstack/react-router";
import ResponsivePagination from "react-responsive-pagination";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { DeleteInventoryForm } from "../form/delete";
import { inventoryListQueryOptions } from "../../-query-options/inventory-query-option";
import { UpdateInventoryform } from "../form/update";

interface InventoryListProps {
  keyword?: string;
}

export function InventoryList({ keyword = "" }: InventoryListProps) {
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
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <ul className="flex min-h-[80vh] w-[98%] flex-wrap justify-center gap-2 p-2">
        {data.items.map((item) => {
          return (
            <li
              key={item.id}
              data-active={item.isActive??"false"}
              className="flex w-[95%] items-center data-[active=false]:brightness-75 flex-grow justify-center gap-2 rounded-xl bg-base-300 p-4 sm:w-[45%] lg:w-[30%]"
            >
              <div className="flex h-full w-full flex-col justify-between gap-2">
                <div className="flex h-full w-full justify-between gap-2">
                  <h1 className="text-2xl font-bold">{item.name}</h1>
                  <UpdateInventoryform item={item} />
                </div>
                {!item.isActive&&<div className="badge badge-primary badge-outline brightness-105">Soft deleted</div>}
                <p>{item.description}</p>
                <div className="flex flex-wrap justify-between gap-2">
                  <div>Price: {item.price}</div>
                  <div>Quantity: {item.quantity}</div>
                </div>
                <div className="flex flex-wrap justify-between gap-2 text-sm">
                  <div>{item.categoryId}</div>
                  <div>SKU: {item.sku}</div>
                  <DeleteInventoryForm id={item.id} hardDelete={!item.isActive} />
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
