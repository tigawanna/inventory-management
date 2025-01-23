import client from '@kubb/plugin-client/clients/fetch'
import type {
  GetApiAuditlogsQueryResponse,
  GetApiAuditlogsQueryParams,
  GetApiAuditlogs400,
  GetApiAuditlogs500,
} from "../../types/'AuditlogsController/GetApiAuditlogs.ts"
import type { RequestConfig, ResponseErrorConfig } from '@kubb/plugin-client/clients/fetch'

export function getGetApiAuditlogsUrlClient() {
  return `/api/auditlogs` as const
}

/**
 * {@link /api/auditlogs}
 */
export async function getApiAuditlogsClient(params?: GetApiAuditlogsQueryParams, config: Partial<RequestConfig> = {}) {
  const res = await client<GetApiAuditlogsQueryResponse, ResponseErrorConfig<GetApiAuditlogs400 | GetApiAuditlogs500>, unknown>({
    method: 'GET',
    url: getGetApiAuditlogsUrlClient().toString(),
    params,
    ...config,
  })
  return res
}