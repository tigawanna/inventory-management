import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  auditlogsListQueryOptions,
  QueryVariables,
} from "@/routes/dashboard/auditlogs/-query-options/auditlogs-query-option";
import { Auditlogscard } from "./Auditlogscard";

interface AuditlogsListProps {
  queryVariables: QueryVariables;
}

export function AuditlogsList({ queryVariables }: AuditlogsListProps) {
  const query = useSuspenseQuery(
    auditlogsListQueryOptions({ ...queryVariables }),
  );
  const data = query.data;
  const error = query.error;

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
    <div className="flex h-full w-full flex-col items-center justify-between">
      <ul className="flex w-[95%] flex-wrap gap-2 p-2">
        {data?.items.map((item) => {
          return <Auditlogscard item={item} key={item.id} />;
        })}
      </ul>
    </div>
  );
}
