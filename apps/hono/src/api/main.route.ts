import { createRouter } from "@/lib/create-app";

import authRoutes from "./auth/auth.index";
import invemtoryRoutes from "./inventory/inventory.index";
import usersRoutes from "./users/users.index";

const mainrouter = createRouter();
mainrouter.route("/api/inventory", invemtoryRoutes);
mainrouter.route("/api/auth", authRoutes);

mainrouter.route("/api/users", usersRoutes);

export default mainrouter;
