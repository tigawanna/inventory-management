export type GetApiAuditlogsIdPathParams = {
  /**
   * @type string
   */
  id: string
}

export const resultActionEnum = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  PASSWORD_RESET: 'PASSWORD_RESET',
  EMAIL_VERIFY: 'EMAIL_VERIFY',
} as const

export type ResultActionEnum = (typeof resultActionEnum)[keyof typeof resultActionEnum]

export const resultEntityTypeEnum = {
  USER: 'USER',
  INVENTORY: 'INVENTORY',
  CATEGORY: 'CATEGORY',
} as const

export type ResultEntityTypeEnum = (typeof resultEntityTypeEnum)[keyof typeof resultEntityTypeEnum]

export const userRoleEnum2 = {
  admin: 'admin',
  user: 'user',
  suspended: 'suspended',
} as const

export type UserRoleEnum2 = (typeof userRoleEnum2)[keyof typeof userRoleEnum2]

/**
 * @description Inventpry by id success
 */
export type GetApiAuditlogsId200 = {
  /**
   * @type object
   */
  result: {
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
    action: ResultActionEnum
    /**
     * @type string
     */
    entityType: ResultEntityTypeEnum
    /**
     * @type string
     */
    entityId: string
    /**
     * @type string
     */
    ipAddress: string | null
    /**
     * @type object
     */
    oldData: {
      [key: string]: unknown
    } | null
    /**
     * @type object
     */
    newData: {
      [key: string]: unknown
    } | null
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
      role: UserRoleEnum2 | null
      /**
       * @type string
       */
      id: string
    } | null
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
 * @description Inventpry by id validation error
 */
export type GetApiAuditlogsId400 = {
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
 * @description Inventpry by id not found error
 */
export type GetApiAuditlogsId404 = {
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

export const errorCodeEnum57 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum57 = (typeof errorCodeEnum57)[keyof typeof errorCodeEnum57]

/**
 * @description Inventpry by id internal server error
 */
export type GetApiAuditlogsId500 = {
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
    code?: ErrorCodeEnum57 | undefined
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

export type GetApiAuditlogsIdQueryResponse = GetApiAuditlogsId200

export type GetApiAuditlogsIdQuery = {
  Response: GetApiAuditlogsId200
  PathParams: GetApiAuditlogsIdPathParams
  Errors: GetApiAuditlogsId400 | GetApiAuditlogsId404 | GetApiAuditlogsId500
}