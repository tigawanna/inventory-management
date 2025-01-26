import { SearchBox } from "@/components/search/SearchBox";
import { Suspense } from "react";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { Helmet } from "@/components/wrappers/custom-helmet";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { CreateInventoryForm } from "./form/create";
import {
  InventoryOrderSelect,
  InventorySortSelect,
} from "./list/InventorySortSelect";
import { InventoriesContainer } from "./list/InventoriesContainer";
import { ResponsiveSuspenseFallbacks } from "@/components/wrappers/ResponsiveSuspenseFallbacks";


interface InventoryPageProps {}

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
          <div className="flex w-[99%] flex-wrap gap-2">
            <div className="flex flex-grow gap-2 md:max-w-[40%]">
              <SearchBox
                inputProps={{
                  placeholder: "Search by name",
                }}
                debouncedValue={debouncedValue}
                isDebouncing={isDebouncing}
                setKeyword={setKeyword}
                keyword={keyword}
              />
            </div>
            {/* <InventoryCategoriesSelect /> */}
            <InventorySortSelect />
            <InventoryOrderSelect />
          </div>
        }
      />

      <div className="m-3 flex h-full w-full flex-col pb-4">
        <Suspense fallback={<ResponsiveSuspenseFallbacks />}>
          <InventoriesContainer keyword={keyword} />
        </Suspense>
      </div>
    </div>
  );
}
