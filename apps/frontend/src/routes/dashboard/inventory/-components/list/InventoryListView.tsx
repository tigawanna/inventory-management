import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";
import { GeneriicTableSkeleton } from "@/components/wrappers/GeneriicTableSkeleton";
import { Suspense } from "react";
import { InventoryList } from "./InventoryList";
import { InventoryTable } from "./InventoryTable";

// TODO : to be hoisted to combine the 2 components
interface InventoryListViewProps {
    keyword:string
}

export function InventoryListView({}: InventoryListViewProps) {
  return (
    <div className="m-3 flex h-full w-full p-5">
      <div className="hidden w-full max-w-[99vw] lg:flex">
        <Suspense fallback={<GeneriicTableSkeleton />}>
          <InventoryTable keyword="" />
        </Suspense>
      </div>
      <div className="flex w-full lg:hidden">
        <Suspense fallback={<CardsListSuspenseFallback />}>
          <InventoryList keyword={""} />
        </Suspense>
      </div>
    </div>
  );
}
