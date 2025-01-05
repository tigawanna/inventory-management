import { createFileRoute, Outlet } from '@tanstack/react-router'
import { ResponsiveGenericToolbar } from '../-components/ResponsiveGenericToolbar';

export const Route = createFileRoute('/auth')({
  component: AuthLayout,
})

interface AuthLayoutProps {}

export function AuthLayout({}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary/20 via-accent/10 to-primary/50">
      <ResponsiveGenericToolbar>
        <Outlet />
      </ResponsiveGenericToolbar>
    </div>
  );
}
