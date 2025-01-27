// const pagename = name.split("/").pop();
// const capitalized = pagename.charAt(0).toUpperCase() + pagename.slice(1);
export function rootPageTemplate(pagename: string, path: string) {
  // const pagename = name.split("/").pop();
  // const capitalized = page.charAt(0).toUpperCase() + page.slice(1);
  const capitalpagename = pagename.charAt(0).toUpperCase() + pagename.slice(1);
  return `
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ${capitalpagename}Page } from "@/routes/${path}/-components/${capitalpagename}Page";

const searchparams = z.object({
  page: z.number().optional(),
  sq: z.string().optional(),
});

export const Route = createFileRoute("/${path}/")({
  validateSearch: (search) => searchparams.parse(search),
  component:${capitalpagename}Page
});

`;
}

// /-components/${capitalpagename}Page
export function rootPageComponentTemplate(pagename: string, path: string) {
  const capitalpagename = pagename.charAt(0).toUpperCase() + pagename.slice(1);
  const pageTitle = `Inventory | ${pagename}`;
  return `
import { SearchBox } from "@/components/search/SearchBox";
import { Suspense } from "react";
import { ListPageHeader } from "@/components/wrappers/ListPageHeader";
import { Helmet } from "@/components/wrappers/custom-helmet";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { Create${capitalpagename}Form } from "./form/create";
import { ${capitalpagename}sContainer } from "./list/${capitalpagename}sContainer.tsx";
import { ResponsiveSuspenseFallbacks } from "@/components/wrappers/ResponsiveSuspenseFallbacks";
interface ${capitalpagename}PageProps {
}

export function ${capitalpagename}Page({}: ${capitalpagename}PageProps) {
  const { debouncedValue, isDebouncing, keyword, setKeyword } =
    usePageSearchQuery("/${path}");
  return (
    <div className="min-h-screen flex h-full w-full gap-5 flex-col items-center ">
      <Helmet title="${pageTitle}" description="The list of ${pageTitle}" />
      <ListPageHeader
        title="${capitalpagename}"
        formTrigger={<Create${capitalpagename}Form />}
        searchBox={
          <SearchBox
            inputProps={{
              placeholder: "Search by name",
            }}
            debouncedValue={debouncedValue}
            isDebouncing={isDebouncing}
            setKeyword={setKeyword}
            keyword={keyword}
          />
        }
      />

      <div className="m-3 flex h-full w-full flex-col justify-center pb-4">
        <Suspense fallback={<ResponsiveSuspenseFallbacks />}>
          <${capitalpagename}sContainer />
        </Suspense>
      </div>
    </div>
  );
}
`;
}

// /-components/${capitalpagename}List
export function rootPageContainerComponentsTemplate(
  pagename: string,
  path: string,
) {
  const capitalpagename = pagename.charAt(0).toUpperCase() + pagename.slice(1);
  return `
import { ErrorWrapper } from "@/components/wrappers/ErrorWrapper";
import { ItemNotFound } from "@/components/wrappers/ItemNotFound";
import { usePageSearchQuery } from "@/hooks/use-page-searchquery";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { ${pagename}ListQueryOptions } from "../../-query-options/${pagename}-query-option";
import ResponsivePagination from "react-responsive-pagination";
import { ${capitalpagename}List } from "./${capitalpagename}List";
import { ${capitalpagename}Table } from "./${capitalpagename}Table";

interface ${capitalpagename}sContainerProps {}

export function ${capitalpagename}sContainer({}: ${capitalpagename}sContainerProps) {
  const { page, updatePage } = usePageSearchQuery("/${path}");
  const sq = useSearch({
    from: "/${path}/",
  });
  const queryVariables = {
    basekey: "${pagename}",
    sq,
    page,
    //TODO: use individual query params based on what your query funtion needs 
    ...Object.keys(sq)
  } as const;
  const query = useSuspenseQuery(
    ${pagename}ListQueryOptions(queryVariables),
  );
  const data = query.data;
  const error = query.error;
  const totalPages = query.data?.totalPages;

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
        <ItemNotFound label="${capitalpagename}" />
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center gap-5 p-2">
      <div className="hidden w-full max-w-[99vw] lg:flex justify-center">
        <${capitalpagename}Table items={data.items} />
      </div>
      <div className="flex w-full lg:hidden justify-center">
        <${capitalpagename}List items={data.items} />
      </div>
      <ResponsivePagination
        current={page ?? 1}
        total={totalPages ?? -1}
        onPageChange={(e) => {
          updatePage(e);
        }}
      />
    </div>
  );
}

`;
}
// /-components/${capitalpagename}List
export function rootPageListComponentsTemplate(pagename: string, path: string) {
  const capitalpagename = pagename.charAt(0).toUpperCase() + pagename.slice(1);
  return `
import { Link } from "@tanstack/react-router";
import { Update${capitalpagename}form } from "@/routes/${path}/-components/form/update";
import { ${capitalpagename}Item } from "../types";

interface ${capitalpagename}ListProps {
  items: never[] | ${capitalpagename}Item[];
}

export function ${capitalpagename}List({ items}: ${capitalpagename}ListProps) {
 return (
    <div className="w-full h-full flex flex-col items-center justify-between ">
      <ul className="w-[95%] min-h-[80vh] flex flex-wrap justify-center p-2 gap-2">
        {items.map((item) => {
          return (
            <li
              key={item.id}
              className="h-56 w-[95%] sm:w-[45%] lg:w-[30%] rounded-xl bg-base-300 p-4 flex justify-center items-center gap-2 "
            >
              <div className="flex flex-col gap-2 w-full h-full justify-between">
              <div className="flex  gap-2 w-full h-full justify-between">
              <h1 className="text-2xl font-bold">
              {item.id}
              </h1>
              <Update${capitalpagename}form item={item} />
              </div>
                <Link
                  to={\`/${path}/$${pagename}\`}
                    params={{users:item.id}}
                  className="text-primary-foreground bg-primary p-2  w-full flex justify-between"
                >
                  <div>see details</div>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
`;
}
// /-components/${capitalpagename}List
export function rootPageTableComponentsTemplate(
  pagename: string,
  path: string,
) {
  const capitalpagename = pagename.charAt(0).toUpperCase() + pagename.slice(1);
  return `
import { ${capitalpagename}Item } from "../types";
import { Update${capitalpagename}form } from "@/routes/${path}/-components/form/update";
import { Link } from "@tanstack/react-router";

interface ${capitalpagename}TableExampleProps {
  items: never[] | ${capitalpagename}Item[];
}

type TableColumn<T extends Record<string, any>> = {
  label: string;
  accessor: keyof T;
};
export function ${capitalpagename}Table({ items }: ${capitalpagename}TableExampleProps) {
  const columns: TableColumn<${capitalpagename}Item>[] = [
    {
      accessor: "id",
      label: "ID",
    },
    { label: "created", accessor: "created_at" }
  ] as const;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <table className="table table-zebra table-lg w-full">
        <thead>
          <tr>
            {columns.map((column, idx) => {
              return (
                <th key={column.accessor + column.label + idx}>
                  {column.label}
                </th>
              );
            })}
            <td>Edit</td>
            <td>Details</td>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => {
            return (
              <tr key={row.id}>
                {columns.map((column, idx) => {
                  return (
                    <td key={column.accessor + column.label + idx}>
                      {row[column.accessor]}
                    </td>
                  );
                })}
                  <td>
                    <Update${capitalpagename}form item={row} />
                  </td>
                <td>
                  <Link
                    to={\`/${path}/$${pagename}\`}
                      params={{users:row.id}}
                    className="text-primary-foreground bg-primary p-2  w-full flex justify-between"
                  >
                    <div>see details</div>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
`;
}
export function rootPageTypeTemplate(pagename: string, path: string) {
  const capitalpagename = pagename.charAt(0).toUpperCase() + pagename.slice(1);
  return `

import { GetApi${capitalpagename}200 } from "@/lib/kubb/gen";

export type ${capitalpagename}Item = GetApi${capitalpagename}200["result"]["items"][0];

`;
}
