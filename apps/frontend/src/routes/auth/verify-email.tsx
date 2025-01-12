import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod';
import { VerifyEmailComponent } from './-components/VerifyEmailComponent';

const searchparams = z.object({
  email: z.string().optional(),
  returnTo: z.string(),
});
export const Route = createFileRoute("/auth/verify-email")({
  component: VerifyEmailComponent,
  validateSearch: (search) => searchparams.parse(search),
});


