
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { CategoriesPage } from "@/routes/dashboard/categories/-components/CategoriesPage";

const searchparams = z.object({
  page: z.number().optional(),
  sq: z.string().optional(),
});

export const Route = createFileRoute("/dashboard/categories/")({
  validateSearch: (search) => searchparams.parse(search),
  component:CategoriesPage
});

