import { UnderDevelopmentLayout } from '@/routes/-components/UnderDevelopmentLayout';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/dashboard/auditlogs")({
  component: UnderDevelopmentLayout,
});


