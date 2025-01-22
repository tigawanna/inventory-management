 import { envVariables } from "@/lib/env";
import { createApiClient } from "@/lib/zod-openapi/generated/Auditlogs";
import { queryOptions } from "@tanstack/react-query";



interface auditlogsQueryOptionPropss {
  keyword: string;
    page?: number;
}
export function auditlogsListQueryOptions({ keyword, page=1 }: auditlogsQueryOptionPropss) {
  return queryOptions({
    queryKey: ["auditlogs_list", keyword,page],
    queryFn: async() => {
      // return new Promise<{
      //     page: number;
      //     perPage: number;
      //     totaleItems: number;
      //     totalPages: number;
      //   items: Array<Record<string, any> & { id: string }>;
      // }>((res) => {
      //   setTimeout(() => {
      //     const resArray = Array.from({ length: 30 }, (_, i) => ({
      //       id: "auditlogs_id_"+i,
      //     }));
      //     res({
      //       page,
      //       perPage: 10,
      //       totaleItems: 30,
      //       totalPages: 3,
      //        items: resArray
      //       .slice((page - 1) * 10, page * 10)
      //       .filter((item) =>item.id.includes(keyword))
      //     });
      //   }, 1000);
      // });
    
   const auditlogs = await createApiClient(envVariables.VITE_API_URL).getApiauditlogs({
      queries:{
        limit: "10",
        page:String(page),
        order: "desc",
        search: keyword,
        sort: "created_at",
      }
    })
    return auditlogs

    },
  });
}
interface oneAuditlogsQueryOptionPropss {
  auditlogs: string;
}
export function oneAuditlogsQueryOptions({ auditlogs }: oneAuditlogsQueryOptionPropss) {
  return queryOptions({
    queryKey: ["one_auditlogs", auditlogs],
    queryFn: () => {
      return new Promise<{ id: string }>((res) => {
        setTimeout(() => {
          res({
            id: auditlogs,
          });
        }, 1000);
      });
    },
  });
}
  