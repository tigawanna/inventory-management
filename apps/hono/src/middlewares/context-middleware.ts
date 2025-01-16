import { AppBindings } from "@/lib/types";
import { getContext } from "hono/context-storage";

export function getCurrentContext() {
  return getContext<AppBindings>();
}
