
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { TeamPage } from "@/routes/dashboard/team/-components/TeamPage";

const searchparams = z.object({
  page: z.number().optional(),
  sq: z.string().optional(),
});

export const Route = createFileRoute("/dashboard/team/")({
  validateSearch: (search) => searchparams.parse(search),
  component:TeamPage
});

