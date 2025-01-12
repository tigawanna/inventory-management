import { listInventory, ListInventoryParams } from "@/lib/api/inventory";
import { queryOptions } from "@tanstack/react-query";

interface inventoryQueryOptionPropss extends ListInventoryParams {
  keyword: string;
  page?: number;
}
export function inventoryListQueryOptions({
  keyword,
  page = 1,
  limit = 10,
  order = "desc",
  sort = "name",
  categoryId="",
}: inventoryQueryOptionPropss) {
  return queryOptions({
    queryKey: ["inventory_list", keyword, page, categoryId, limit, order, sort],
    queryFn: async () => {
      const items = await listInventory({
        search: keyword,
        page,
        categoryId,
        limit,
        order,
        sort,
      });
      if (items.error) {
        return {
          page,
          perPage: 10,
          totaleItems:0,
          totalPages: 0,
          items: [],
        };
      }
      //  if(!items.record){
      //   throw new Error("Inventory not found")
      //  }
      return items.record;
    },
    staleTime: 1000,
    
  });
}
interface oneInventoryQueryOptionPropss {
  inventory: string;
}
export function oneInventoryQueryOptions({
  inventory,
}: oneInventoryQueryOptionPropss) {
  return queryOptions({
    queryKey: ["one_inventory", inventory],
    queryFn: () => {
      return new Promise<{ id: string }>((res) => {
        setTimeout(() => {
          res({
            id: inventory,
          });
        }, 1000);
      });
    },
  });
}
