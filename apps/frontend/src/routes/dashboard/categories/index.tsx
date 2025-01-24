
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CategoriesPage } from "@/routes/dashboard/categories/-components/CategoriesPage";
import { getApiCategoriesQueryParamsSchema } from "@/lib/kubb/gen";


const searchparams = getApiCategoriesQueryParamsSchema;

export const Route = createFileRoute("/dashboard/categories/")({
  validateSearch: (search) => searchparams.parse(search),
  component:CategoriesPage
});

