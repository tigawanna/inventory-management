import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { DeleteInventoryForm } from "../form/delete";
import { UpdateInventoryform } from "../form/update";
import { InventoryItem } from "../types";


interface InventoryListProps {
  items: never[] | InventoryItem[];
}

export function InventoryList({ items }: InventoryListProps) {
    const { viewer } = useViewer();
    const role = viewer?.role;
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <ul className="flex min-h-[80vh] w-[98%] flex-wrap justify-center gap-2 p-2">
        {items.map((item) => {
          return (
            <li
              key={item.id}
              data-active={item.isActive ?? "false"}
              className="flex w-[95%] flex-grow items-center justify-center gap-2 rounded-xl bg-base-300 p-4 data-[active=false]:brightness-75 sm:w-[45%] lg:w-[30%]"
            >
              <div className="flex h-full w-full flex-col justify-between gap-2">
                <div className="flex h-full w-full justify-between gap-2">
                  <h1 className="text-2xl font-bold">{item.name}</h1>
                  <UpdateInventoryform item={item} />
                </div>
                {!item.isActive && (
                  <div className="badge badge-primary badge-outline brightness-105">
                    Soft deleted
                  </div>
                )}
                <p>{item.description}</p>
                <div className="flex flex-wrap justify-between gap-2">
                  <div>Price: {item.price}</div>
                  <div>Quantity: {item.quantity}</div>
                </div>
                <div className="flex flex-wrap justify-between gap-2 text-sm">
                  <div>{item.categoryId}</div>
                  <div>SKU: {item.sku}</div>
                  <DeleteInventoryForm
                    id={item.id}
                    hardDelete={!item.isActive}
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
