import { createRouter } from "@/lib/create-app";

import authRoutes from "./auth/auth.index";
import invemtoryRoutes from "./inventory/inventory.index";
import usersRoutes from "./users/users.index";
import categoriesRoutes from "./categories/categories.index";

const mainrouter = createRouter();
mainrouter.route("/api/inventory", invemtoryRoutes);
mainrouter.route("/api/auth", authRoutes);

mainrouter.route("/api/users", usersRoutes);
mainrouter.route("/api/categories", categoriesRoutes);

export default mainrouter;
