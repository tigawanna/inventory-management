import { SearchBox } from "@/components/search/SearchBox";
import { useDebouncedValue } from "@/hooks/use-debouncer";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import { categoriesListQueryOptions } from "../../-query-options/categories-query-option";
import { CategoriesList } from "../list/CategoriesList";
import { CategoryTable } from "../list/CategoryTable";
import { CategoryItem } from "../types";
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { ResponsiveSuspenseFallbacks } from "@/components/wrappers/ResponsiveSuspenseFallbacks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";
import { Check, X } from "lucide-react";
interface SearchCategoryInputProps {
  trigger?: JSX.Element;
  setCategory: (categories: CategoryItem[]) => void;
}

export function SearchCategoryInput({
  trigger,
  setCategory,
}: SearchCategoryInputProps) {
  const [selected, setSelected] = useState<never[] | CategoryItem[]>([]);
  const [keyword, setKeyword] = useState("");
  const { debouncedValue, isDebouncing } = useDebouncedValue(keyword, 2000);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setCategory(selected);
  }, [selected]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full">
          {trigger || (
            <SearchBox
              inputProps={{
                placeholder: "Search categories by name",
              }}
              debouncedValue={debouncedValue}
              isDebouncing={isDebouncing}
              setKeyword={setKeyword}
              keyword={keyword}
            />
          )}
        </DialogTrigger>
        <DialogContent className="w-[95%]">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              Filter through categories by name
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full items-center gap-2">
            <SearchBox
              inputProps={{
                placeholder: "Search categories by name",
              }}
              debouncedValue={debouncedValue}
              isDebouncing={isDebouncing}
              setKeyword={setKeyword}
              keyword={keyword}
            />
            <button
              aria-describedby="accept selected and close"
              disabled={selected.length === 0}
              onClick={() => {
                setCategory(selected);
                setOpen(false);
              }}
              className="btn btn-outline btn-success btn-sm"
            >
              <Check />
            </button>
          </div>
          <Suspense fallback={<ResponsiveSuspenseFallbacks />}>
            <SearchCategoryList
              keyword={debouncedValue}
              selected={selected}
              setSelected={setSelected}
            />
          </Suspense>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface SearchCategoryListProps {
  keyword: string;
  selected?: never[] | CategoryItem[];
  setSelected?: React.Dispatch<React.SetStateAction<never[] | CategoryItem[]>>;
}

export function SearchCategoryList({
  keyword,
  selected,
  setSelected,
}: SearchCategoryListProps) {
  const query = useSuspenseQuery(
    categoriesListQueryOptions({
      keyword,
      sort: "name",
      page: 1,
      limit: 24,
      order: "desc",
    }),
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
        <ItemNotFound label="Categories" />
      </div>
    );
  }
  const items = data.items;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center overflow-auto">
      <CategoriesList
        items={items}
        selected={selected}
        setSelected={setSelected}
        maxSelect={1}
        searchMode
      />
    </div>
  );
}
