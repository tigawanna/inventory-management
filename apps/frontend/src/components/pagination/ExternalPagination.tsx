import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { ValidRoutes } from "@/lib/tanstack/router/router-types";
import { ListResultSchema } from "@/utils/types/data";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronsLeft, ChevronsRight } from "lucide-react";
import ResponsivePagination from "react-responsive-pagination";
interface ExternalPaginationProps {
  route: ValidRoutes;
  queryKey: (any)[];
}

export function ExternalPagination({
  route,
  queryKey,
}: ExternalPaginationProps) {
  const queryClient = useQueryClient();
  const { page, updatePage } = usePageSearchQuery(route);
  const queryData = queryClient.getQueryData<ListResultSchema>(queryKey);
  const totalPages = queryData?.totalPages ?? -1;

  if(totalPages === -1){
    return(
      <div className="flex w-full items-center justify-center gap-3 p-2">
        <button className="btn btn-sm" onClick={() => updatePage(page - 1)}>
          <ChevronsLeft/>
        </button>
        <button className="btn btn-sm" onClick={() => updatePage(page + 1)}>
          <ChevronsRight/>
        </button>
        </div>

    )
  }

  return (
    <div className="flex w-full items-center justify-center p-2">
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
