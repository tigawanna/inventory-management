import { makeHotToast } from "@/components/toasters";
import { GetApiUsersQueryParams, usersService } from "@/lib/kubb/gen";
import { queryOptions } from "@tanstack/react-query";

interface userQueryOptionPropss extends GetApiUsersQueryParams {
  page?: number;
}
export function userListQueryOptions({
  page = 1,
  limit,
  order,
  search,
  sort,
}: userQueryOptionPropss) {
  return queryOptions({
    queryKey: ["users", page, limit, order, search, sort],
    queryFn: async () => {
      // return new Promise<{
      //     page: number;
      //     perPage: number;
      //     totaleItems: number;
      //     totalPages: number;
      //   items: Array<Record<string, any> & { id: string }>;
      // }>((res) => {
      //   setTimeout(() => {
      //     const resArray = Array.from({ length: 30 }, (_, i) => ({
      //       id: "user_id_"+i,
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
      const response = await usersService().getApiUsersClient({
        page,
        limit,
        order,
        search,
        sort,
      });
      if (response.type === "error") {
        makeHotToast({
          title: "Error fetching records",
          description: response.statusText,
          variant: "error",
        });
        return {
          page,
          perPage: 0,
          totaleItems: 0,
          totalPages: 0,
          items: [],
        };
      }
      return response.data.result;
    },
  });
}
interface oneUserQueryOptionPropss {
  user: string;
}
export function oneUserQueryOptions({ user }: oneUserQueryOptionPropss) {
  return queryOptions({
    queryKey: ["one_user", user],
    queryFn: () => {
      return new Promise<{ id: string }>((res) => {
        setTimeout(() => {
          res({
            id: user,
          });
        }, 1000);
      });
    },
  });
}
