
import { createFileRoute } from '@tanstack/react-router'
import { OneTeamPage } from '@/routes/dashboard/team/-components/oneteam/OneTeamPage'

export const Route = createFileRoute('/dashboard/team/$team/')({
  component: OneTeamPage
})

  