import { createFileRoute } from '@tanstack/react-router'
import { OneUserPage } from '@/routes/dashboard/users/-components/oneuser/OneUserPage'

export const Route = createFileRoute('/dashboard/users/$user/')({
  component: OneUserPage,
})
