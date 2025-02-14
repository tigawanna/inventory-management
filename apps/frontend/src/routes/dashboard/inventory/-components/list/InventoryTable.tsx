import { InventoryItem } from "../types";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { UpdateInventoryform } from "../form/update";
import { DeleteInventoryForm } from "../form/delete";
import { Trash2 } from "lucide-react";

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
    { label: "qty", accessor: "quantity" },
    { label: "price", accessor: "price" },
    { label: "Cat", accessor: "categoryId" },
    { label: "Created", accessor: "created_at" },
  ];
  const { viewer } = useViewer();
  const role = viewer?.result?.role;
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
                  <div data-active={row.isActive ?? "false"} className="flex justify-center flex-wrap gap-1">
                    <DeleteInventoryForm id={row.id} />
                    {!row.isActive && (
                      <div className="text-xs text-error">hard delete</div>
                    )}
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
