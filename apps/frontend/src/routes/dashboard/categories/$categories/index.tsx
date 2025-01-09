
import { createFileRoute } from '@tanstack/react-router'
import { OneCategoriesPage } from '@/routes/dashboard/categories/-components/onecategories/OneCategoriesPage'

export const Route = createFileRoute('/dashboard/categories/$categories/')({
  component: OneCategoriesPage
})

  