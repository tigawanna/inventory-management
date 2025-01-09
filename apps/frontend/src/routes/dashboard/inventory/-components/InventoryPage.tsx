
import { SearchBox } from "@/components/search/SearchBox";
import { Suspense } from "react";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { Helmet } from "@/components/wrappers/custom-helmet";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { CreateInventoryForm } from "./form/create";
import { InventoryList } from "./list/InventoryList";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";
import { InventoryOrderSelect, InventorySortSelect } from "./list/InventorySortSelect";
import { InventoryTable } from "./list/InventoryTable";
import { GeneriicTableSkeleton } from "@/components/wrappers/GeneriicTableSkeleton";


interface InventoryPageProps {
}

export function InventoryPage({}: InventoryPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePageSearchQuery("/dashboard/inventory");
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center gap-5">
      <Helmet
        title="Collabs | inventory"
        description="The list of Collabs | inventory"
      />
      <ListPageHeader
        title="Inventory"
        formTrigger={
          <div className="flex w-full gap-2">
            <CreateInventoryForm />
          </div>
        }
        searchBox={
          <div className="flex w-[99%] gap-2">
            <SearchBox
              inputProps={{
                placeholder: "Search by name",
              }}
              debouncedValue={debouncedValue}
              isDebouncing={isDebouncing}
              setKeyword={setKeyword}
              keyword={keyword}
            />
            <InventorySortSelect />
            <InventoryOrderSelect />
          </div>
        }
      />

      <div className="m-3 flex h-full w-full  p-5">
        <div className="hidden w-full max-w-[99vw] lg:flex">
          <Suspense fallback={<GeneriicTableSkeleton />}>
            <InventoryTable keyword={keyword} />
          </Suspense>
        </div>
        <div className="flex w-full lg:hidden">
          <Suspense fallback={<CardsListSuspenseFallback />}>
            <InventoryList keyword={keyword} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
