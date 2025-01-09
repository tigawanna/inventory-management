
import { createFileRoute } from '@tanstack/react-router'
import { OneAuditlogsPage } from '@/routes/dashboard/auditlogs/-components/oneauditlogs/OneAuditlogsPage'

export const Route = createFileRoute('/dashboard/auditlogs/$auditlogs/')({
  component: OneAuditlogsPage
})

  