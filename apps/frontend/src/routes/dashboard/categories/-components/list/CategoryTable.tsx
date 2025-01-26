import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { CategoryItem } from "../types";
import { UpdateCategoriesform } from "../form/update";
import { DeleteCategoryForm } from "../form/delete";
import { makeHotToast } from "@/components/toasters";

interface CategoryTableProps {
  items: never[] | CategoryItem[];
  selected?: never[] | CategoryItem[];
  setSelected?: React.Dispatch<React.SetStateAction<never[] | CategoryItem[]>>;
  maxSelect?: number;
}
type TableAccessror = keyof CategoryItem;
type TableColumn = {
  label: string;
  accessor: TableAccessror;
};

export function CategoryTable({
  items,
  maxSelect,
  selected,
  setSelected,
}: CategoryTableProps) {
  const columns: TableColumn[] = [
    {
      accessor: "name",
      label: "Name",
    },
    {
      label: "Description",
      accessor: "description",
    },
    { label: "created", accessor: "created_at" },
    { label: "updated", accessor: "updated_at" },
  ];
  const { viewer } = useViewer();
  const role = viewer?.role;
  return (
    <div className="flex w-full flex-col gap-5 overflow-x-auto">
      <table className="table table-zebra table-lg w-full">
        <thead>
          <tr>
            {selected && (
              <th>
                <input
                  type="checkbox"
                  className="checkbox-primary checkbox checkbox-xs ring-2 ring-primary"
                  onChange={(e) =>
                    setSelected?.(
                      e.target.checked ? items.slice(0, maxSelect) : [],
                    )
                  }
                />
              </th>
            )}
            {columns.map((column, idx) => {
              return (
                <th key={column.accessor + column.label + idx}>
                  {column.label}
                </th>
              );
            })}
            {role === "admin" && <th>Edit</th>}
            {role === "admin" ? <th>Hard Delete</th> : <th>Soft Delete</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((row) => {
            const checked = selected?.find((s) => s.id === row.id);
            return (
              <tr key={row.id}>
                {selected && (
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox-primary checkbox checkbox-xs ring-2 ring-primary"
                      checked={checked !== undefined}
                      onChange={(e) => {
                        if (e.target.checked) {
                          if (
                            maxSelect &&
                            (selected || []).length >= maxSelect
                          ) {
                            return makeHotToast({
                              title: "Limit reached",
                              description:
                                "You can only select up to " +
                                maxSelect +
                                " items , please unselect some",
                              variant: "info",
                            })
                          }
                          setSelected?.([...(selected || []), row]);
                        } else {
                          setSelected?.(
                            (selected || []).filter((s) => s.id !== row.id),
                          );
                        }
                      }}
                    />
                  </td>
                )}
                {columns.map((column, idx) => {
                  return (
                    <td key={column.accessor + row.id + idx}>
                      {row?.[column?.accessor]}
                    </td>
                  );
                })}
                {role === "admin" && (
                  <td key={"update" + row.id}>
                    <UpdateCategoriesform item={row} />
                  </td>
                )}
                <td key={"delete" + row.id}>
                  <DeleteCategoryForm id={row.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
