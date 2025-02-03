import { createFileRoute } from '@tanstack/react-router'
import { UserPage } from '@/routes/dashboard/users/-components/UserPage'
import { getApiUsersQueryParamsSchema } from '@/lib/kubb/gen';

const searchparams = getApiUsersQueryParamsSchema;

export const Route = createFileRoute('/dashboard/users/')({
  validateSearch: (search) => searchparams.parse(search),
  component: UserPage,
})
