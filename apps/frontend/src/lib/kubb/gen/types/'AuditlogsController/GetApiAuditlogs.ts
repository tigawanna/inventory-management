export const getApiAuditlogsQueryParamsOrderEnum = {
  asc: 'asc',
  desc: 'desc',
} as const

export type GetApiAuditlogsQueryParamsOrderEnum = (typeof getApiAuditlogsQueryParamsOrderEnum)[keyof typeof getApiAuditlogsQueryParamsOrderEnum]

export const getApiAuditlogsQueryParamsSortEnum = {
  created_at: 'created_at',
} as const

export type GetApiAuditlogsQueryParamsSortEnum = (typeof getApiAuditlogsQueryParamsSortEnum)[keyof typeof getApiAuditlogsQueryParamsSortEnum]

export const getApiAuditlogsQueryParamsEntityEnum = {
  USER: 'USER',
  INVENTORY: 'INVENTORY',
  CATEGORY: 'CATEGORY',
} as const

export type GetApiAuditlogsQueryParamsEntityEnum = (typeof getApiAuditlogsQueryParamsEntityEnum)[keyof typeof getApiAuditlogsQueryParamsEntityEnum]

export const getApiAuditlogsQueryParamsActionEnum = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  PASSWORD_RESET: 'PASSWORD_RESET',
  EMAIL_VERIFY: 'EMAIL_VERIFY',
} as const

export type GetApiAuditlogsQueryParamsActionEnum = (typeof getApiAuditlogsQueryParamsActionEnum)[keyof typeof getApiAuditlogsQueryParamsActionEnum]

export type GetApiAuditlogsQueryParams = {
  /**
   * @default 1
   * @type number
   */
  page?: (number | null) | undefined
  /**
   * @default 10
   * @type number
   */
  limit?: (number | null) | undefined
  /**
   * @default "desc"
   * @type string | undefined
   */
  order?: GetApiAuditlogsQueryParamsOrderEnum | undefined
  /**
   * @type string | undefined
   */
  search?: string | undefined
  /**
   * @type string | undefined
   */
  sort?: GetApiAuditlogsQueryParamsSortEnum | undefined
  /**
   * @type string | undefined
   */
  entity?: GetApiAuditlogsQueryParamsEntityEnum | undefined
  /**
   * @type string | undefined
   */
  action?: GetApiAuditlogsQueryParamsActionEnum | undefined
}

export const itemsActionEnum = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  PASSWORD_RESET: 'PASSWORD_RESET',
  EMAIL_VERIFY: 'EMAIL_VERIFY',
} as const

export type ItemsActionEnum = (typeof itemsActionEnum)[keyof typeof itemsActionEnum]

export const itemsEntityTypeEnum = {
  USER: 'USER',
  INVENTORY: 'INVENTORY',
  CATEGORY: 'CATEGORY',
} as const

export type ItemsEntityTypeEnum = (typeof itemsEntityTypeEnum)[keyof typeof itemsEntityTypeEnum]

export const userRoleEnum = {
  admin: 'admin',
  user: 'user',
} as const

export type UserRoleEnum = (typeof userRoleEnum)[keyof typeof userRoleEnum]

/**
 * @description Auditlogs listing success
 */
export type GetApiAuditlogs200 = {
  /**
   * @type object
   */
  result: {
    /**
     * @type number
     */
    page: number | null
    /**
     * @type number
     */
    perPage: number | null
    /**
     * @type number
     */
    totalItems: number | null
    /**
     * @type number
     */
    totalPages: number | null
    /**
     * @type array
     */
    items: {
      /**
       * @type string
       */
      id: string
      /**
       * @type string
       */
      updated_at: string | null
      /**
       * @type string
       */
      created_at: string | null
      /**
       * @type string
       */
      userId: string | null
      /**
       * @type string
       */
      action: ItemsActionEnum
      /**
       * @type string
       */
      entityType: ItemsEntityTypeEnum
      /**
       * @type string
       */
      entityId: string
      /**
       * @type string
       */
      ipAddress: string | null
      oldData?: unknown | undefined
      newData?: unknown | undefined
      /**
       * @type object
       */
      user: {
        /**
         * @type string
         */
        name: string
        /**
         * @type string
         */
        email: string
        /**
         * @type string
         */
        avatarUrl: string | null
        /**
         * @type string
         */
        role: UserRoleEnum | null
        /**
         * @type string
         */
        id: string
      } | null
    }[]
  }
  error?: unknown | undefined
}

export const errorCodeEnum55 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum55 = (typeof errorCodeEnum55)[keyof typeof errorCodeEnum55]

/**
 * @description Auditlogs listing validation error
 */
export type GetApiAuditlogs400 = {
  result?: unknown | undefined
  /**
   * @type object
   */
  error: {
    /**
     * @type string
     */
    message: string
    /**
     * @type string | undefined
     */
    code?: ErrorCodeEnum55 | undefined
    /**
     * @type object | undefined
     */
    data?:
      | {
          [key: string]: {
            /**
             * @type string
             */
            code: string
            /**
             * @type string
             */
            message: string
          }
        }
      | undefined
  } | null
}

export const errorCodeEnum56 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum56 = (typeof errorCodeEnum56)[keyof typeof errorCodeEnum56]

/**
 * @description Auditlogs listing internal server error
 */
export type GetApiAuditlogs500 = {
  result?: unknown | undefined
  /**
   * @type object
   */
  error: {
    /**
     * @type string
     */
    message: string
    /**
     * @type string | undefined
     */
    code?: ErrorCodeEnum56 | undefined
    /**
     * @type object | undefined
     */
    data?:
      | {
          [key: string]: {
            /**
             * @type string
             */
            code: string
            /**
             * @type string
             */
            message: string
          }
        }
      | undefined
  } | null
}

export type GetApiAuditlogsQueryResponse = GetApiAuditlogs200

export type GetApiAuditlogsQuery = {
  Response: GetApiAuditlogs200
  QueryParams: GetApiAuditlogsQueryParams
  Errors: GetApiAuditlogs400 | GetApiAuditlogs500
}