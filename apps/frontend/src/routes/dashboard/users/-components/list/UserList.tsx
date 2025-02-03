import { Link } from "@tanstack/react-router";
import { UpdateUserform } from "@/routes/dashboard/users/-components/form/update";
import { UserItem } from "../types";
import { useViewer } from "@/lib/tanstack/query/use-viewer";
import { Check } from "lucide-react";

interface UserListProps {
  items: never[] | UserItem[];
}

export function UserList({ items }: UserListProps) {
  const { role, viewer } = useViewer();

  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <ul className="flex min-h-[80vh] w-[95%] flex-wrap justify-center gap-2 p-2">


        {items.map((item) => {
          return (
            <li
              key={item.id}
              data-mine={item.id === viewer?.result?.id}
              className="animate-gradient flex h-56 w-[95%] items-center justify-center gap-2 rounded-xl bg-base-300 p-4 data-[mine=true]:bg-base-200 data-[mine=true]:bg-gradient-to-r data-[mine=true]:from-accent data-[mine=true]:via-transparent data-[mine=true]:to-primary data-[mine=true]:bg-[length:200%_200%] sm:w-[45%] lg:w-[30%]"
            >
              <div className="flex h-full w-full flex-col justify-between gap-2">
                <div className="flex h-full w-full flex-col justify-between gap-2">
                  <div className="relative flex h-full w-full justify-between gap-2">
                    <h1 className="text-2xl font-bold">{item.name}</h1>
                    <div
                      data-mine={item.id === viewer?.result?.id}
                      className="abosolute badge badge-success badge-outline left-0 top-0 hidden flex-col justify-between gap-2 data-[mine=true]:flex"
                    >
                      Me <Check />
                    </div>
                    {(viewer?.result?.id === item.id || role === "admin") && (
                      <UpdateUserform item={item} />
                    )}
                  </div>

                  <p>{item.email}</p>
                  <div className="flex flex-wrap justify-between gap-2">
                    <div
                      data-role={item.role}
                      className="data-[role=admin]:badge-secondary badge badge-primary badge-outline data-[role=admin]:badge-outline"
                    >
                      {item.role}
                    </div>
                    {item?.lastLoginAt && (
                      <div>
                        last logged in:{" "}
                        {new Date(item?.lastLoginAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 text-sm">
                    {/* <DeleteUserForm
                      id={item.id}
                      hardDelete={!item.isActive}
                    /> */}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
