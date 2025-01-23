import client from '@kubb/plugin-client/clients/fetch'
import type {
  GetApiAuditlogsIdQueryResponse,
  GetApiAuditlogsIdPathParams,
  GetApiAuditlogsId400,
  GetApiAuditlogsId404,
  GetApiAuditlogsId500,
} from "../../types/'AuditlogsController/GetApiAuditlogsId.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getGetApiAuditlogsIdUrlClient({ id }: { id: GetApiAuditlogsIdPathParams['id'] }) {
  return `/api/auditlogs/:id` as const
}

/**
 * {@link /api/auditlogs/:id}
 */
export async function getApiAuditlogsIdClient({ id }: { id: GetApiAuditlogsIdPathParams['id'] }, config: Partial<RequestConfig> = {}) {
  const res = await client<GetApiAuditlogsIdQueryResponse, ResponseErrorConfig<GetApiAuditlogsId400 | GetApiAuditlogsId404 | GetApiAuditlogsId500>, unknown>({
    method: 'GET',
    url: getGetApiAuditlogsIdUrlClient({ id }).toString(),
    ...config,
  })
  return res
}