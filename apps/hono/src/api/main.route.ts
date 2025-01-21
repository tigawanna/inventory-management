import { createRouter } from "@/lib/create-app";

import auditlogsRoutes from "./auditlogs/auditlogs.index";
import authRoutes from "./auth/auth.index";
import categoriesRoutes from "./categories/categories.index";
import invemtoryRoutes from "./inventory/inventory.index";
import usersRoutes from "./users/users.index";

const mainrouter = createRouter();
mainrouter.route("/api/inventory", invemtoryRoutes);
mainrouter.route("/api/auth", authRoutes);

mainrouter.route("/api/users", usersRoutes);
mainrouter.route("/api/categories", categoriesRoutes);
mainrouter.route("/api/auditlogs", auditlogsRoutes);

export default mainrouter;
