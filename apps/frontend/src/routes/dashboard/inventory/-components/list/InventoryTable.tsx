import { InventoryItem } from "@/lib/api/inventory";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { UpdateInventoryform } from "../form/update";
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { inventoryListQueryOptions } from "../../-query-options/inventory-query-option";

interface InventoryTableProps {
    keyword:string
}

type TableAccessror = keyof InventoryItem;
type TableColumn = {
  label: string;
  accessor: TableAccessror;
};

export function InventoryTable({keyword}: InventoryTableProps) {
  const columns: TableColumn[] = [
    {
      accessor: "name",
      label: "Reciept Number",
    },
    {
      label: "Description",
      accessor: "description",
    },
    { label: "SKU", accessor: "sku" },
    { label: "Year", accessor: "price" },
    { label: "price", accessor: "price" },
    { label: "Shop", accessor: "created_at" },
  ];
  const { page, updatePage } = usePageSearchQuery("/dashboard/inventory");
  const sp = useSearch({ from: "/dashboard/inventory/" });
  const { viewer } = useViewer();
  const query = useSuspenseQuery(
      inventoryListQueryOptions({ ...sp, keyword, page }),
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
          <ItemNotFound label="Inventory" />
        </div>
      );
    }
  const role = viewer?.role;
  return (
    <div className="w-full overflow-x-auto">
      <table className="table table-zebra table-lg w-full">
        <thead>
          <tr>
            <th>name</th>
            {columns.map((column) => {
              return <th key={column.accessor}>{column.label}</th>;
            })}
            {role === "admin" && <th>Edit</th>}
          </tr>
        </thead>
        <tbody>
          {data?.items.map((row) => {
            return(
            <tr key={row.id}>
              {columns.map((column) => {
                return <td key={column.accessor}>{row?.[column?.accessor]}</td>;
              })}
              {role === "admin" && (
                <td>
                  <UpdateInventoryform item={row} />
                </td>
              )}
            </tr>
          )}
          )}
        </tbody>
      </table>
    </div>
  );
}
