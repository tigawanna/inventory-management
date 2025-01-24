import { Suspense } from "react";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { Helmet } from "@/components/wrappers/custom-helmet";
import {
  AuditlogsOrderSelect,
  AuditlogsEntityFilterSelect,
  AuditlogsActionFilterSelect,
} from "./list/AuditLogsSortSelect";
import { AudilogsContainer } from "./list/AudilogsContainer";
import { ResponsiveSuspenseFallbacks } from "@/components/wrappers/ResponsiveSuspenseFallbacks";

interface AuditlogsPageProps {}

export function AuditlogsPage({}: AuditlogsPageProps) {
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

      <div className="m-3 flex h-full w-full flex-col pb-4">
        <Suspense fallback={<ResponsiveSuspenseFallbacks />}>
          <AudilogsContainer />
        </Suspense>
      </div>
    </div>
  );
}
