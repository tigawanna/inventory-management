import { UserItem } from "../types";
import { UpdateUserform } from "@/routes/dashboard/users/-components/form/update";
import { Link } from "@tanstack/react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { Ban, Fullscreen } from "lucide-react";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
interface UserTableExampleProps {
  items: never[] | UserItem[];
}

type TableColumn<T extends Record<string, any>> = {
  label: string;
  accessor: keyof T;
};
export function UserTable({ items }: UserTableExampleProps) {
  const columns: TableColumn<UserItem>[] = [
    {
      accessor: "name",
      label: "Name",
    },
    { accessor: "email", label: "Email" },
    { accessor: "role", label: "Role" },
    { label: "created", accessor: "created_at" },
  ] as const;
  const { role, viewer } = useViewer();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
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
            
            {<td>Edit</td>}
          </tr>
        </thead>
        <tbody>
          {items.map((row) => {
            return (
              <tr
                key={row.id}
                data-mine={row.id === viewer?.id}
                className="data-[mine=true]:bg-accent"
              >
                {columns.map((column, idx) => {
                  if (column.accessor === "metadata") {
                    return (
                      <td key={column.accessor + column.label + idx}>
                        {row[column.accessor] ? (
                          <Popover>
                            <PopoverTrigger className="badge badge-secondary badge-outline gap-1">
                              metadata
                              <Fullscreen className="size-4" />
                            </PopoverTrigger>
                            <PopoverContent className="w-fit">
                              <pre>
                                {JSON.stringify(row[column.accessor], null, 2)}
                              </pre>
                            </PopoverContent>
                          </Popover>
                        ) : (
                          <Ban className="size-5 text-error" />
                        )}
                      </td>
                    );
                  }
                  if (
                    column.accessor === "created_at" ||
                    column.accessor === "updated_at" ||
                    column.accessor === "lastLoginAt"
                  ) {
                    return (
                      <td key={column.accessor + row.id + idx}>
                        {/* @ts-expect-error : this will be a date */}
                        {new Date(row?.[column?.accessor]).toLocaleDateString()}
                      </td>
                    );
                  }
                  if(column.accessor === "role"){
                    return (
                      <td key={column.accessor + row.id + idx}>
                        <div
                          data-role={row.role}
                          className="data-[role=suspended]:badge-outline badge badge-primary badge-outline data-[role=admin]:badge-secondary data-[role=suspended]:badge-error data-[role=admin]:badge-outline"
                        >
                          {row.role}
                        </div>
                      </td>
                    );
                  }
                  return (
                    <td key={column.accessor + column.label + idx}>
                      {row[column.accessor]}
                    </td>
                  );
                })}
                {viewer?.id === row.id || role === "admin" ? (
                  <td>
                    <UpdateUserform item={row} />
                  </td>
                ) : (
                  <td>-</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
