import { makeHotToast } from "@/components/toasters";
import { listInventory, ListInventoryParams } from "@/lib/api/inventory";
import { inventoryService } from "@/lib/kubb/gen";
import { queryOptions } from "@tanstack/react-query";

export type InventoryQueryVariables= {
  basekey: "inventory_list";
  keyword?: string;
  page?: number;
  limit?: number;
  order?: "asc" | "desc";
  sort?: "name" | "quantity" | "price";
  categoryId?: string;
}

interface inventoryQueryOptionPropss{

}
export function inventoryListQueryOptions({
  basekey,
  keyword,
  page,
  limit,
  order,
  sort,
  categoryId,
}: InventoryQueryVariables) {
  // console.log(" query key in query function == ", [basekey, keyword, page, categoryId, limit, order, sort]);
  return queryOptions({
    queryKey: [basekey, keyword, page, categoryId, limit, order, sort],
    queryFn: async () => {
      const response = await inventoryService().getApiInventoryClient({
        search: keyword,
        categoryId,
        order,
        sort,
        
      })
       if(response.type === "error"){
         makeHotToast({
           title: "Error fetching records",
           description: response.statusText,
           variant: "error",
         })
         return {
           page,
           perPage: 0,
           totaleItems: 0,
           totalPages: 0,
           items: [],
         }
       }
       return response.data.result;
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
