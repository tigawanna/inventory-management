import { createRouter } from "@/lib/create-app";

import invemtoryRoutes from "./inventory/index";

const v1router = createRouter()
 v1router.route("/api/v1/inventory", invemtoryRoutes)   

export default v1router
