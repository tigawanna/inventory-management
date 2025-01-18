import { createRouter } from "@/lib/create-app";

import invemtoryRoutes from "./inventory/inventory.index";

const mainrouter = createRouter()
 mainrouter.route("/api/inventory", invemtoryRoutes)   

export default mainrouter
