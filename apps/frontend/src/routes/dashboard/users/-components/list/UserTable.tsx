import { UserItem } from "../types";
import { UpdateUserform } from "@/routes/dashboard/users/-components/form/update";
import { Link } from "@tanstack/react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { Ban, Fullscreen } from "lucide-react";
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
            <td>Edit</td>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => {
            return (
              <tr key={row.id}>
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
                    column.accessor === "updated_at"
                  ) {
                    return (
                      <td key={column.accessor + row.id + idx}>
                        {/* @ts-expect-error : this will be a date */}
                        {new Date(row?.[column?.accessor]).toLocaleDateString()}
                      </td>
                    );
                  }
                  return (
                    <td key={column.accessor + column.label + idx}>
                      {row[column.accessor]}
                    </td>
                  );
                })}
                <td>
                  <UpdateUserform item={row} />
                </td>
                <td>
                  {/* <Link
                    to={`/dashboard/users/$user`}
                    params={{ user: row.id }}
                    className="flex w-full justify-between bg-primary p-2 text-primary-foreground"
                  >
                    <div>see details</div>
                  </Link> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
