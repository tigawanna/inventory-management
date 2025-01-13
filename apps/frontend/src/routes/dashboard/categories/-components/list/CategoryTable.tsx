import { CategoryItem } from "@/lib/api/category";
import { useViewer } from "@/lib/tanstack/query/use-viewer";

interface CategoryTableProps {
  items: never[] | CategoryItem[];
}
type TableAccessror = keyof CategoryItem;
type TableColumn = {
  label: string;
  accessor: TableAccessror;
};

export function CategoryTable({ items }: CategoryTableProps) {
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
            return (
              <tr key={row.id}>
                {columns.map((column, idx) => {
                  return (
                    <td key={column.accessor + row.id + idx}>
                      {row?.[column?.accessor]}
                    </td>
                  );
                })}
                {role === "admin" && (
                  <td key={"update" + row.id}>
                    {/* <UpdateInventoryform item={row} /> */}
                  </td>
                )}
                <td key={"delete" + row.id}>
                  {/* <DeleteInventoryForm id={row.id} /> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
