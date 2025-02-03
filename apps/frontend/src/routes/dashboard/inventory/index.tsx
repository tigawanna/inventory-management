import { createFileRoute } from '@tanstack/react-router'
import { InventoryPage } from './-components/InventoryPage'
import { z } from 'zod'


const searchparams = z.object({
  page: z.number().optional(),
  sq: z.string().optional(),
  limit: z.number().optional(),
  sort: z.enum(['name', 'quantity', 'price']).optional(),
  order: z.enum(['asc', 'desc']).default('desc').optional(),
  categoryId: z.string().optional(),
})

export const Route = createFileRoute('/dashboard/inventory/')({

  component: InventoryPage,
  validateSearch: (search) => searchparams.parse(search),
})
