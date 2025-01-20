
  import { createRouter } from "@/lib/create-app";
  
  import { categoriesCreateHandler, categoriesCreateRoute } from "./categories.create";
  import { categoriesDeleteHandler, categoriesDeleteRoute } from "./categories.delete";
  import { categoriesListHandler, categoriesListRoute } from "./categories.list";
  import { categoriesGetOneHandler, categoriesGetOneRoute } from "./categories.one";
  import { categoriesUpdateHandler, categoriesUpdateRoute } from "./categories.update";
  
  const router = createRouter()
    .openapi(categoriesListRoute, categoriesListHandler)
    .openapi(categoriesGetOneRoute, categoriesGetOneHandler)
    .openapi(categoriesCreateRoute, categoriesCreateHandler)
    .openapi(categoriesUpdateRoute, categoriesUpdateHandler)
    .openapi(categoriesDeleteRoute, categoriesDeleteHandler);
  
  export default router;
  