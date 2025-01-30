import { Auditlogscard } from "./AuditlogsCard";
import { GetApiAuditlogsQueryResponse } from "@/lib/kubb/gen";

interface AuditlogsListProps {
  items: GetApiAuditlogsQueryResponse["result"]["items"];
}

export function AuditlogsList({ items }: AuditlogsListProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ul className="flex w-[95%] flex-wrap gap-2 p-2">
        {items?.map((item) => {
          return <Auditlogscard item={item} key={item.id} />;
        })}
      </ul>
    </div>
  );
}
