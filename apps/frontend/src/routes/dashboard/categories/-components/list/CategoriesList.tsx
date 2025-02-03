import { UpdateCategoriesform } from "@/routes/dashboard/categories/-components/form/update";
import { DeleteCategoryForm } from "../form/delete";
import { makeHotToast } from "@/components/toasters";
import { CategoryItem } from "../types";

interface CategoriesListProps {
  items: never[] | CategoryItem[];
  selected?: never[] | CategoryItem[];
  setSelected?: React.Dispatch<React.SetStateAction<never[] | CategoryItem[]>>;
  maxSelect?: number;
  searchMode?: boolean;
}

export function CategoriesList({
  items,
  selected,
  setSelected,
  maxSelect,
  searchMode,
}: CategoriesListProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <ul className="flex w-full flex-wrap justify-center gap-2">
        {items.map((item) => {
          const checked = selected?.find((s) => s.id === item.id);
          return (
            <li
              key={item.id}
              data-mode={searchMode}
              className="flex h-fit w-[99%] gap-2 rounded-xl bg-base-300 p-3 data-[mode=true]:w-full sm:w-[45%] lg:w-[30%]"
            >
              <div className="flex h-full w-full justify-between gap-2">
                <div className="flex h-full w-full flex-col justify-between gap-2">
                  <div className="flex h-full w-full items-center gap-2">
                    {selected && (
                      <input
                        type="checkbox"
                        className="checkbox-primary checkbox checkbox-xs ring-2 ring-primary"
                        checked={checked !== undefined}
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (maxSelect && maxSelect === 1) {
                              return setSelected?.([item]);
                            }
                            if (
                              maxSelect &&
                              (selected || []).length >= maxSelect
                            )
                              return makeHotToast({
                                title: "Limit reached",
                                description:
                                  "You can only select up to " +
                                  maxSelect +
                                  " items , please unselect some",
                                variant: "info",
                              });

                            setSelected?.([...(selected || []), item]);
                          } else {
                            setSelected?.(
                              (selected || []).filter((s) => s.id !== item.id),
                            );
                          }
                        }}
                      />
                    )}
                    <h1 className="text-2xl font-bold">{item.name}</h1>
                  </div>
                  <p className="line-clamp-2">{item.description}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <UpdateCategoriesform item={item} />
                  <DeleteCategoryForm id={item.id} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
