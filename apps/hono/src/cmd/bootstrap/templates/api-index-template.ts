import { capitalizeFirstLetter } from "@/cmd/utils/string";

interface ApiIndexTemplateProps {
  routename: string;
}
export function apiIndexTemplate({ routename }: ApiIndexTemplateProps) {
  const filename = `${routename}.index.ts`;
  const template = `
  import { createRouter } from "@/lib/create-app";
  
  import { ${routename}CreateHandler, ${routename}CreateRoute } from "./${routename}.create";
  import { ${routename}DeleteHandler, ${routename}DeleteRoute } from "./${routename}.delete";
  import { ${routename}ListHandler, ${routename}ListRoute } from "./${routename}.list";
  import { ${routename}GetOneHandler, ${routename}GetOneRoute } from "./${routename}.one";
  import { ${routename}UpdateHandler, ${routename}UpdateRoute } from "./${routename}.update";
  
  const router = createRouter()
    .openapi(${routename}ListRoute, ${routename}ListHandler)
    .openapi(${routename}GetOneRoute, ${routename}GetOneHandler)
    .openapi(${routename}CreateRoute, ${routename}CreateHandler)
    .openapi(${routename}UpdateRoute, ${routename}UpdateHandler)
    .openapi(${routename}DeleteRoute, ${routename}DeleteHandler);
  
  export default router;
  `;
  return { template, filename };
}
