import { createFileRoute } from '@tanstack/react-router'
import { ForgortPassword } from './-components/ForgortPassword'
import { z } from 'zod';
const searchparams = z.object({
  returnTo: z.string(),
});
export const Route = createFileRoute("/auth/forgort-password")({
  component: ForgortPassword,
  validateSearch: (search) => searchparams.parse(search),
});

