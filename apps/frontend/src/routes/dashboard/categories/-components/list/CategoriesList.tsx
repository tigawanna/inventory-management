import { UpdateCategoriesform } from "@/routes/dashboard/categories/-components/form/update";
import { CategoryItem } from "@/lib/api/category";

interface CategoriesListProps {
  items: never[] | CategoryItem[];
}

export function CategoriesList({ items }: CategoriesListProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <ul className="flex min-h-[80vh] w-full flex-wrap justify-center gap-2 ">
        {items.map((item) => {
          return (
            <li
              key={item.id}
              className="flex h-56 w-[99%]  gap-2 rounded-xl bg-base-300 p-4 sm:w-[45%] lg:w-[30%]"
            >
              <div className="flex h-full w-full flex-col justify-between gap-2">
                <div className="flex h-full w-full justify-between gap-2">
                  <h1 className="text-2xl font-bold">{item.id}</h1>
                  <UpdateCategoriesform item={item} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>

    </div>
  );
}
