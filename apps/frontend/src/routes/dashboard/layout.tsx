import { createFileRoute, redirect } from '@tanstack/react-router'
import { DashboardLayout } from './-components/dashoboard-sidebar/DashboardLayout'

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context }) => {
    if (!context?.viewer?.result?.id) {
      throw redirect({ to: "/auth", search: { returnTo: "/dashboard/inventory" } });
    }
  },
  component: DashboardLayout,
});

