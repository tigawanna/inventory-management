import { createFileRoute } from '@tanstack/react-router'
import { ForgortPassword } from './-components/ForgortPassword'

export const Route = createFileRoute('/auth/forgort-password')({
  component: ForgortPassword,
})

