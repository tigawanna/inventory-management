import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { auditlogsListQueryOptions } from "@/routes/dashboard/auditlogs/-query-options/auditlogs-query-option";
import { useQueryClient } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import ResponsivePagination from "react-responsive-pagination";
interface ExternalPaginationProps {
  keyword: string;
}

export function ExternalPagination({ keyword }: ExternalPaginationProps) {
  const queryClient = useQueryClient();
  const { page, updatePage } = usePageSearchQuery("/dashboard/auditlogs");
  const { action, entity } = useSearch({
    from: "/dashboard/auditlogs/",
  });
  const queryData = queryClient.getQueryData([
    "auditlogs_list",
    keyword,
    page,
    action,
    entity,
  ]);
  console.log("queryData", queryData);
  const totalPages = queryData?.result?.totalPages ?? -1;
  console.log("totalPages", totalPages);
  return (
    <div className="flex w-full items-center justify-center">
      <ResponsivePagination
        current={page ?? 1}
        total={totalPages}
        onPageChange={(e) => {
          updatePage(e);
        }}
      />
    </div>
  );
}
