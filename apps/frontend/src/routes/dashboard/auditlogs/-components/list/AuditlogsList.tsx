import { Auditlogscard } from "./Auditlogscard";
import { GetApiAuditlogsQueryResponse } from "@/lib/kubb/gen";

interface AuditlogsListProps {
  data: GetApiAuditlogsQueryResponse["result"]["items"];
}

export function AuditlogsList({ data }: AuditlogsListProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <ul className="flex w-[95%] flex-wrap gap-2 p-2">
        {data?.map((item) => {
          return <Auditlogscard item={item} key={item.id} />;
        })}
      </ul>
    </div>
  );
}
