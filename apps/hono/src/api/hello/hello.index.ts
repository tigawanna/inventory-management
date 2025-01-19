
  import { createRouter } from "@/lib/create-app";
  
  import { helloCreateHandler, helloCreateRoute } from "./hello.create";
  import { helloDeleteHandler, helloDeleteRoute } from "./hello.delete";
  import { helloListHandler, helloListRoute } from "./hello.list";
  import { helloGetOneHandler, helloGetOneRoute } from "./hello.one";
  import { helloUpdateHandler, helloUpdateRoute } from "./hello.update";
  
  const router = createRouter()
    .openapi(helloListRoute, helloListHandler)
    .openapi(helloGetOneRoute, helloGetOneHandler)
    .openapi(helloCreateRoute, helloCreateHandler)
    .openapi(helloUpdateRoute, helloUpdateHandler)
    .openapi(helloDeleteRoute, helloDeleteHandler);
  
  export default router;
  