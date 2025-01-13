
import { SearchBox } from "@/components/search/SearchBox";
import { Suspense } from "react";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { Helmet } from "@/components/wrappers/custom-helmet";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { CreateCategoriesForm } from "./form/create";
import { CategoriesList } from "./list/CategoriesList";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";
import { CategoriesContainer } from "./list/CategoriesContainer";
import { ResponsiveSuspenseFallbacks } from "@/components/wrappers/ResponsiveSuspenseFallbacks";

interface CategoriesPageProps {
}

export function CategoriesPage({}: CategoriesPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePageSearchQuery("/dashboard/categories");
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center gap-5">
      <Helmet
        title="Collabs | categories"
        description="The list of Collabs | categories"
      />
      <ListPageHeader
        title="Categories"
        formTrigger={<CreateCategoriesForm />}
        searchBox={
          <SearchBox
            inputProps={{
              placeholder: "Search by name",
            }}
            debouncedValue={debouncedValue}
            isDebouncing={isDebouncing}
            setKeyword={setKeyword}
            keyword={keyword}
          />
        }
      />

      <div className="m-3 flex h-full w-full items-center justify-center p-5">
        <Suspense fallback={<ResponsiveSuspenseFallbacks />}>
          <CategoriesContainer keyword={keyword} />
        </Suspense>
      </div>
    </div>
  );
}
