import { UpdateCategoriesform } from "@/routes/dashboard/categories/-components/form/update";
import { CategoryItem } from "@/lib/api/category";
import { DeleteCategoryForm } from "../form/delete";

interface CategoriesListProps {
  items: never[] | CategoryItem[];
}

export function CategoriesList({ items }: CategoriesListProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <ul className="flex w-full flex-wrap justify-center gap-2">
        {items.map((item) => {
          return (
            <li
              key={item.id}
              className="flex h-fit w-[99%] gap-2 rounded-xl bg-base-300 p-3 sm:w-[45%] lg:w-[30%]"
            >
              <div className="flex h-full w-full justify-between gap-2">
                <div className="flex h-full w-full flex-col justify-between gap-2">
                  <h1 className="text-2xl font-bold">{item.name}</h1>
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
