import { getContext } from "hono/context-storage";

import type { AppBindings } from "@/lib/types";

export function getCurrentContext() {
  return getContext<AppBindings>();
}
