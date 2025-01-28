
import { Link } from "@tanstack/react-router";
import { UpdateUserform } from "@/routes/dashboard/users/-components/form/update";
import { UserItem } from "../types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/ui/popover";
interface UserListProps {
  items: never[] | UserItem[];
}

export function UserList({ items}: UserListProps) {
 return (
    <div className="w-full h-full flex flex-col items-center justify-between ">
      <ul className="w-[95%] min-h-[80vh] flex flex-wrap justify-center p-2 gap-2">
        {items.map((item) => {
          return (
            <li
              key={item.id}
              className="flex h-56 w-[95%] items-center justify-center gap-2 rounded-xl bg-base-300 p-4 sm:w-[45%] lg:w-[30%]"
            >
              <div className="flex h-full w-full flex-col justify-between gap-2">
                <div className="flex h-full w-full flex-col justify-between gap-2">
                  <div className="flex h-full w-full justify-between gap-2">
                    <h1 className="text-2xl font-bold">{item.name}</h1>
                    <UpdateUserform item={item} />
                  </div>

                  <p>{item.email}</p>
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>Price: {item.role}</div>
                    <div>Quantity: {item.lastLoginAt}</div>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 text-sm">
                    {/* <DeleteUserForm
                      id={item.id}
                      hardDelete={!item.isActive}
                    /> */}
                  </div>
                </div>
                <Link
                  to={`/dashboard/users/$user`}
                  params={{ user: item.id }}
                  className="flex w-full justify-between bg-primary p-2 text-primary-foreground"
                >
                  <div>see details</div>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
