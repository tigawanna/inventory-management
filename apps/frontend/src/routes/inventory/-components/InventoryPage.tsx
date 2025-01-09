
import { SearchBox } from "@/components/search/SearchBox";
import { Suspense } from "react";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { Helmet } from "@/components/wrappers/custom-helmet";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { CreateInventoryForm } from "./form/create";
import { InventoryList } from "./list/InventoryList";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";
import { InventoryOrderSelect, InventorySortSelect } from "./list/InventorySortSelect";
import { ChevronLeft } from "lucide-react";

interface InventoryPageProps {
}

export function InventoryPage({}: InventoryPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePageSearchQuery("/inventory");
  return (
    <div className="min-h-screen flex h-full w-full gap-5 flex-col items-center ">
      <Helmet title="Collabs | inventory" description="The list of Collabs | inventory" />
      <ListPageHeader
        title="Inventory"
        formTrigger={
          <div className="w-full flex gap-2">
        <CreateInventoryForm />
          </div>
      }
        searchBox={
          <div className="w-full flex gap-2">
          <SearchBox
            inputProps={{
              placeholder: "Search by name",
            }}
            debouncedValue={debouncedValue}
            isDebouncing={isDebouncing}
            setKeyword={setKeyword}
            keyword={keyword}
          />
          <InventorySortSelect/>
          <InventoryOrderSelect/>
          </div>
        }
      />

     <div className="m-3 flex h-full w-full items-center justify-center p-5 ">
        <Suspense fallback={<CardsListSuspenseFallback />}>
          <InventoryList keyword={keyword} />
        </Suspense>
      </div>
    </div>
  );
}
