import { createRouter } from "@/lib/create-app";

import { usersDeleteHandler, usersDeleteRoute } from "./users.delete";
import { usersListHandler, usersListRoute } from "./users.list";
import { usersGetOneHandler, usersGetOneRoute } from "./users.one";
import { usersUpdateHandler, usersUpdateRoute } from "./users.update";

const router = createRouter()
  .openapi(usersListRoute, usersListHandler)
  .openapi(usersGetOneRoute, usersGetOneHandler)
  .openapi(usersUpdateRoute, usersUpdateHandler)
  .openapi(usersDeleteRoute, usersDeleteHandler);

export default router;
