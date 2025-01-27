import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { auditlogsListQueryOptions } from "../../-query-options/auditlogs-query-option";
import ResponsivePagination from "react-responsive-pagination";
import { AuditlogsList } from "./AuditlogsList";
import { AudiLogsTable } from "./AuditLogsTable";

interface AudilogsContainerProps {}

export function AudilogsContainer({}: AudilogsContainerProps) {
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
  const query = useSuspenseQuery(
    auditlogsListQueryOptions({ ...queryVariables }),
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
        <ItemNotFound label="Auditlogs" />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center gap-5 p-2">
      <div className="hidden w-full max-w-[99vw] lg:flex justify-center">
        <AudiLogsTable items={data.items} />
      </div>
      <div className="flex w-full lg:hidden justify-center">
        <AuditlogsList data={data.items} />
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
