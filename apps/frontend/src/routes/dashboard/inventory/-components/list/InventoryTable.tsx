import { InventoryItem } from "@/lib/api/inventory";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { UpdateInventoryform } from "../form/update";
import { DeleteInventoryForm } from "../form/delete";

interface InventoryTableProps {
  items: never[] | InventoryItem[];
}

type TableAccessror = keyof InventoryItem;
type TableColumn = {
  label: string;
  accessor: TableAccessror;
};

export function InventoryTable({ items }: InventoryTableProps) {
  const columns: TableColumn[] = [
    {
      accessor: "name",
      label: "Name",
    },
    {
      label: "Description",
      accessor: "description",
    },
    { label: "SKU", accessor: "sku" },
    { label: "Year", accessor: "price" },
    { label: "price", accessor: "price" },
    { label: "Category", accessor: "categoryId" },
    { label: "Created", accessor: "created_at" },
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
              <tr
                key={row.id}
                data-active={row.isActive ?? "false"}
                className="data-[active=false]:brightness-75"
              >
                {columns.map((column, idx) => {
                  return (
                    <td key={column.accessor + row.id + idx}>
                      {row?.[column?.accessor]}
                    </td>
                  );
                })}
                {role === "admin" && (
                  <td key={"update" + row.id}>
                    <UpdateInventoryform item={row} />
                  </td>
                )}
                <td key={"delete" + row.id}>
                  <div className="flex gap-2">
                  <DeleteInventoryForm id={row.id} />
                  {!row.isActive && <div className="badge badge-primary">soft deleted</div>}

                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
