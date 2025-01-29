
import { SearchBox } from "@/components/search/SearchBox";
import { Suspense } from "react";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { Helmet } from "@/components/wrappers/custom-helmet";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { UsersContainer } from "./list/UsersContainer.tsx";
import { ResponsiveSuspenseFallbacks } from "@/components/wrappers/ResponsiveSuspenseFallbacks";
interface UserPageProps {
}

export function UserPage({}: UserPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePageSearchQuery("/dashboard/users");
  return (
    <div className="min-h-screen flex h-full w-full gap-5 flex-col items-center ">
      <Helmet title="Inventory | users" description="The list of Inventory | user" />
      <ListPageHeader
        title="Users"
        // formTrigger={<CreateUserForm />}
        searchBox={
          <SearchBox
            inputProps={{
              placeholder: "Search by name or email",
            }}
            debouncedValue={debouncedValue}
            isDebouncing={isDebouncing}
            setKeyword={setKeyword}
            keyword={keyword}
          />
        }
      />

      <div className="m-3 flex h-full w-full flex-col justify-center pb-4">
        <Suspense fallback={<ResponsiveSuspenseFallbacks />}>
          <UsersContainer keyword={debouncedValue} />
        </Suspense>
      </div>
    </div>
  );
}
