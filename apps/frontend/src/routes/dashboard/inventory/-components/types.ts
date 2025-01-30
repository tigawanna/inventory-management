import { GetApiInventory200 } from "@/lib/kubb/gen";

export type InventoryItem = GetApiInventory200["result"]["items"][number];
