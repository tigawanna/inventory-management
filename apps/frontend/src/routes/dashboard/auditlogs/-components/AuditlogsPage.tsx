import { Suspense } from "react";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { Helmet } from "@/components/wrappers/custom-helmet";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { AuditlogsList } from "./list/AuditlogsList";
import { CardsListSuspenseFallback } from "@/components/wrappers/GenericDataCardsListSuspenseFallback copy";
import {
  AuditlogsOrderSelect,
  AuditlogsEntityFilterSelect,
  AuditlogsActionFilterSelect,
} from "./list/AuditLogsSortSelect";

interface AuditlogsPageProps {}

export function AuditlogsPage({}: AuditlogsPageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePageSearchQuery("/dashboard/auditlogs");
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center gap-5">
      <Helmet
        title="Collabs | auditlogs"
        description="The list of Collabs | auditlogs"
      />
      <ListPageHeader
        title="Auditlogs"
        // formTrigger={<CreateAuditlogsForm />}
        searchBox={
          <div className="flex w-full items-center justify-end gap-2">
            {/* <SearchBox
              inputProps={{
                placeholder: "Search by name",
                }}
                debouncedValue={debouncedValue}
                isDebouncing={isDebouncing}
                setKeyword={setKeyword}
                keyword={keyword}
                /> */}
            <div className="flex items-center justify-end gap-2">
              <AuditlogsEntityFilterSelect />
              <AuditlogsActionFilterSelect />
              <AuditlogsOrderSelect />
            </div>
          </div>
        }
      />

      <div className="m-3 flex h-full w-full items-center justify-center p-5">
        <Suspense fallback={<CardsListSuspenseFallback />}>
          <AuditlogsList keyword={keyword} />
        </Suspense>
      </div>
    </div>
  );
}
