/* eslint-disable perfectionist/sort-imports */
import { createRouter } from "@/lib/create-app";

import authRoutes from "./auth/auth.index";
import invemtoryRoutes from "./inventory/inventory.index";

import helloRoutes from "./hello/hello.index";

const mainrouter = createRouter();
mainrouter.route("/api/inventory", invemtoryRoutes);
mainrouter.route("/api/auth", authRoutes);

mainrouter.route("/api/hello", helloRoutes);

export default mainrouter;
