
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { userListQueryOptions } from "../../-query-options/user-query-option";
import ResponsivePagination from "react-responsive-pagination";
import { UserList } from "./UserList";
import { UserTable } from "./UserTable";


interface UsersContainerProps {
  keyword:string
}

export function UsersContainer({
  keyword
}: UsersContainerProps) {
  const { page, updatePage } = usePageSearchQuery("/dashboard/users");
  const {limit,order,sort} = useSearch({
    from: "/dashboard/users/",
  });
  const queryVariables = {
    basekey: "users",
    page,
    limit,
    order,
    search:keyword,
    sort,
  } as const;
  const query = useSuspenseQuery(
    userListQueryOptions(queryVariables),
  );
  const data = query.data;
  const error = query.error;
  const totalPages = query.data?.totalPages;

  if (error) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <ErrorWrapper err={error} />
      </div>
    );
  }

  if (!data || data?.items?.length === 0) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <ItemNotFound label="User" />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center gap-5 p-2">
      <div className="hidden w-full max-w-[99vw] lg:flex justify-center">
        <UserTable items={data.items} />
      </div>
      <div className="flex w-full lg:hidden justify-center">
        <UserList items={data.items} />
      </div>
      <ResponsivePagination
        current={page ?? 1}
        total={totalPages ?? -1}
        onPageChange={(e) => {
          updatePage(e);
        }}
      />
    </div>
  );
}

