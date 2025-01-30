import { GetApiCategories200 } from "@/lib/kubb/gen";

export type CategoryItem = GetApiCategories200["result"]["items"][number];
