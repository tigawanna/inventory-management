import { getApiAuditlogsClient } from './getApiAuditlogsClient.ts'
import { getApiAuditlogsIdClient } from './getApiAuditlogsIdClient.ts'

export function auditlogsService() {
  return { getApiAuditlogsClient, getApiAuditlogsIdClient }
}