
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { InventoryPage } from "@/routes/inventory/-components/InventoryPage";





const searchparams = z.object({
  page: z.number().optional(),
  sq: z.string().optional(),
  limit: z.number().optional(),
  sort: z.enum(["name", "quantity", "price"]).optional(),
  order: z.string().optional(),
});

export const Route = createFileRoute("/inventory/")({
  validateSearch: (search) => searchparams.parse(search),
  component:InventoryPage
});

