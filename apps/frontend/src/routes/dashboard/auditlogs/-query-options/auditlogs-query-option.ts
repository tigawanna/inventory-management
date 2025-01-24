import { makeHotToast } from "@/components/toasters";
import { envVariables } from "@/lib/env";
import { auditlogsService } from "@/lib/kubb/gen";
import { createApiClient } from "@/lib/zod-openapi/generated/Auditlogs";
import { queryOptions } from "@tanstack/react-query";


  export type QueryVariables = {
    readonly basekey: "auditlogs_list";
    readonly page: any;
    readonly action:
      | "CREATE"
      | "UPDATE"
      | "DELETE"
      | "LOGIN"
      | "LOGOUT"
      | "PASSWORD_RESET"
      | "EMAIL_VERIFY"
      | undefined;
    readonly entity: "USER" | "INVENTORY" | "CATEGORY" | undefined;
  };


export function auditlogsListQueryOptions(
  { basekey, action, entity, page = 1 }: QueryVariables,
) {
  return queryOptions({
    queryKey: [basekey, page, action, entity],
    queryFn: async () => {
    const response = await auditlogsService().getApiAuditlogsClient({
        limit: "10",
        page: String(page),
        order: "desc",
        sort: "created_at",
        action,
        entity,
      });
       if(response.type === "error"){
         makeHotToast({
           title: "Error fetching records",
           description: response.statusText,
           variant: "error",
         })
         return {
           page,
           perPage: 0,
           totaleItems: 0,
           totalPages: 0,
           items: [],
         }
       }
       return response.data.result;
    },
  });
}
interface oneAuditlogsQueryOptionPropss {
  auditlogs: string;
}
export function oneAuditlogsQueryOptions(
  { auditlogs }: oneAuditlogsQueryOptionPropss,
) {
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
