import { createFileRoute, redirect } from '@tanstack/react-router'
import { InventoryPage } from './-components/InventoryPage'
import { z } from 'zod'


const searchparams = z.object({
  page: z.number().optional(),
  sq: z.string().optional(),
  limit: z.number().optional(),
  sort: z.enum(['name', 'quantity', 'price']).optional(),
  order: z.enum(['asc', 'desc']).default('desc').optional(),
})

export const Route = createFileRoute('/dashboard/inventory/')({
  beforeLoad: ({ context }) => {
    if (!context?.viewer?.record?.id) {
      throw redirect({ to: '/auth', search: { returnTo: '/inventory' } })
    }
  },
  component: InventoryPage,
  validateSearch: (search) => searchparams.parse(search),
})
