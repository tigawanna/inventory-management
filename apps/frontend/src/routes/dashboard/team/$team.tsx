import { createFileRoute } from '@tanstack/react-router'
import { OneTeamPage } from './-components/oneteam/OneTeamPage';

export const Route = createFileRoute("/dashboard/team/$team")({
  component: OneTeamPage,
});

