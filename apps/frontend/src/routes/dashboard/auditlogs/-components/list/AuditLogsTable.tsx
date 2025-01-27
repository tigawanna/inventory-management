import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { AuditLogItem } from "../types";
import { PossibleNestedUnions } from "@/utils/types/nested_objects_union";
import { getNestedProperty } from "@/utils/object";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
import { Ban, Fullscreen } from "lucide-react";

interface AudiLogsTableProps {
  items: never[] | AuditLogItem[];
}
type TableAccessror = keyof AuditLogItem;
type TableColumn<T extends Record<string, any>> = {
  label: string;
  accessor: PossibleNestedUnions<T>;
};

export function AudiLogsTable({ items }: AudiLogsTableProps) {
  const columns: TableColumn<AuditLogItem>[] = [
    {
      accessor: "action",
      label: "action",
    },
    {
      label: "entity",
      accessor: "entityType",
    },
    {
      label: "newData",
      accessor: "newData",
    },
    {
      label: "oldData",
      accessor: "oldData",
    },
    {
      label: "user",
      accessor: "user",
    },
    { label: "created", accessor: "created_at" },
    { label: "updated", accessor: "updated_at" },
  ] as const;

  return (
    <div className="flex w-full flex-col justify-center gap-5 overflow-x-auto">
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
          </tr>
        </thead>
        <tbody>
          {items.map((row) => {
            return (
              <tr key={row.id}>
                {columns.map((column, idx) => {
                  if (
                    column.accessor === "newData" ||
                    column.accessor === "oldData"
                  ) {
                    const cellData = row?.[column?.accessor] as {};
                    return (
                      <td key={column.accessor + row.id + idx}>
                        {cellData ? (
                          <Popover>
                            <PopoverTrigger className="badge badge-primary badge-outline gap-1">
                              {column.label}
                              <Fullscreen className="size-4" />
                            </PopoverTrigger>
                            <PopoverContent className="w-fit">
                              <pre className="min-h-fit max-w-[50%]">
                                {JSON.stringify(cellData, null, 2)}
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
                  if (column.accessor === "user") {
                    const user = row?.[column?.accessor];
                    return (
                      <td key={column.accessor + row.id + idx}>
                        {user ? (
                          <Popover>
                            <PopoverTrigger className="badge badge-secondary badge-outline gap-1">
                              {user?.name}
                              <Fullscreen className="size-4" />
                            </PopoverTrigger>
                            <PopoverContent className="w-fit">
                              <div className="flex items-center justify-between gap-2">
                                <h1 className="text-2xl font-bold">
                                  {user?.name}
                                </h1>
                                <div
                                  data-role={user.role}
                                  className="badge badge-accent badge-outline data-[role=admin]:badge-error data-[role=admin]:badge-outline"
                                >
                                  {user?.role}
                                </div>
                              </div>
                              <p>{user?.email}</p>
                            </PopoverContent>
                          </Popover>
                        ) : (
                          <Ban className="size-5 text-error" />
                        )}
                      </td>
                    );
                  }
                  return (
                    <td key={column.accessor + row.id + idx}>
                      {/* @ts-expect-error : the unknown fields aren't used */}
                      {row?.[column?.accessor]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
