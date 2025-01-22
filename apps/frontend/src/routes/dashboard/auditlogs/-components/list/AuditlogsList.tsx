
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { useSuspenseQuery } from "@tanstack/react-query";
import ResponsivePagination from "react-responsive-pagination";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { UpdateAuditlogsform } from "@/routes/dashboard/auditlogs/-components/form/update";
import { auditlogsListQueryOptions } from "@/routes/dashboard/auditlogs/-query-options/auditlogs-query-option";
import { Auditlogscard } from "./Auditlogscard";
import { useSearch } from "@tanstack/react-router";

interface AuditlogsListProps {
  keyword?: string;
}

export function AuditlogsList({ keyword = "" }: AuditlogsListProps) {
  const { page,updatePage } = usePageSearchQuery("/dashboard/auditlogs");
  const {action,entity} = useSearch({
    from:"/dashboard/auditlogs/"
  })
  const query = useSuspenseQuery(auditlogsListQueryOptions({ keyword,page,action,entity }));
  const data = query.data;
  const error = query.error;

  if (error) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <ErrorWrapper err={error} />
      </div>
    );
  }
  if (data.error) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <ErrorWrapper err={data.error} />
      </div>
    );
  }
  if (!data || data?.result?.items?.length === 0) {
    return (
      <div className="flex h-full min-h-[90vh] w-full flex-col items-center justify-center">
        <ItemNotFound label="Auditlogs" />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col items-center justify-between ">
      <ul className="w-[95%] min-h-[80vh] flex flex-wrap justify-center p-2 gap-2">
        {data?.result?.items.map((item) => {
          return (
            <Auditlogscard item={item} key={item.id}/>

          );
        })}
      </ul>
            <div className="flex w-full items-center justify-center">
        <ResponsivePagination
          current={page ?? 1}
          total={data.result?.totalPages??0}
          onPageChange={(e) => {
            updatePage(e);
          }}
        />
      </div>
    </div>
  );
}


