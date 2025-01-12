
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CategoriesPage } from "@/routes/dashboard/categories/-components/CategoriesPage";
import { categorySortBy } from "@/lib/api/category";

const searchparams = z.object({
  page: z.string().optional(),
  sq: z.string().optional(),
  limit: z.string().optional(),
  sort: z.enum(categorySortBy).optional(),
  order: z.enum(["asc", "desc"]).default("desc").optional(),
});

export const Route = createFileRoute("/dashboard/categories/")({
  validateSearch: (search) => searchparams.parse(search),
  component:CategoriesPage
});

