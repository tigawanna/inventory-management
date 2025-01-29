export const resultRoleEnum4 = {
  admin: 'admin',
  user: 'user',
  suspended: 'suspended',
} as const

export type ResultRoleEnum4 = (typeof resultRoleEnum4)[keyof typeof resultRoleEnum4]

/**
 * @description Current user successfully
 */
export type GetApiAuthMe200 = {
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
    role: ResultRoleEnum4 | null
    /**
     * @minLength -2147483648
     * @maxLength 2147483647
     * @type integer
     */
    refreshTokenVersion: number | null
    /**
     * @type boolean
     */
    isEmailVerified: boolean | null
    /**
     * @type string
     */
    lastLoginAt: string | null
    /**
     * @type object
     */
    metadata: {
      [key: string]: unknown
    } | null
  }
  error?: unknown | undefined
}

export const errorCodeEnum28 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum28 = (typeof errorCodeEnum28)[keyof typeof errorCodeEnum28]

/**
 * @description Current user validation error
 */
export type GetApiAuthMe400 = {
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
    code?: ErrorCodeEnum28 | undefined
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

export const errorCodeEnum29 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum29 = (typeof errorCodeEnum29)[keyof typeof errorCodeEnum29]

/**
 * @description Current user not found error
 */
export type GetApiAuthMe404 = {
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
    code?: ErrorCodeEnum29 | undefined
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

export const errorCodeEnum30 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum30 = (typeof errorCodeEnum30)[keyof typeof errorCodeEnum30]

/**
 * @description Current user internal error
 */
export type GetApiAuthMe500 = {
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
    code?: ErrorCodeEnum30 | undefined
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

export type GetApiAuthMeQueryResponse = GetApiAuthMe200

export type GetApiAuthMeQuery = {
  Response: GetApiAuthMe200
  Errors: GetApiAuthMe400 | GetApiAuthMe404 | GetApiAuthMe500
}