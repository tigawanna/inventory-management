import { createRouter } from "@/lib/create-app";

import authRoutes from "./auth/auth.index";
import invemtoryRoutes from "./inventory/inventory.index";

const mainrouter = createRouter();
mainrouter.route("/api/inventory", invemtoryRoutes);
mainrouter.route("/api/auth", authRoutes);

export default mainrouter;
