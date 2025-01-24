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
import { useSearch } from "@tanstack/react-router";
import { ExternalPagination } from "@/components/pagination/ExternalPagination";

interface AuditlogsPageProps {}

export function AuditlogsPage({}: AuditlogsPageProps) {
  const { page, updatePage } = usePageSearchQuery("/dashboard/auditlogs");
  const { action, entity } = useSearch({
    from: "/dashboard/auditlogs/",
  });
  const queryVariables = {
    basekey: "auditlogs_list",
    page,
    action,
    entity,
  } as const;
  const queryKey = [
    "auditlogs_list",
    queryVariables.page,
    queryVariables.action,
    queryVariables.entity,
  ];
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
            <div className="flex items-center justify-end gap-2">
              <AuditlogsEntityFilterSelect />
              <AuditlogsActionFilterSelect />
              <AuditlogsOrderSelect />
            </div>
          </div>
        }
      />

      <div className="m-3 flex h-full w-full flex-col items-center justify-center p-5">
        <Suspense fallback={<CardsListSuspenseFallback />}>
          <AuditlogsList queryVariables={queryVariables} />
        </Suspense>
        <ExternalPagination
          queryKey={queryKey as string[]}
          route="/dashboard/auditlogs"
        />
      </div>
    </div>
  );
}
