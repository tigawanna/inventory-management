export type GetApiUsersIdPathParams = {
  /**
   * @type string
   */
  id: string
}

export const resultRoleEnum7 = {
  admin: 'admin',
  user: 'user',
} as const

export type ResultRoleEnum7 = (typeof resultRoleEnum7)[keyof typeof resultRoleEnum7]

/**
 * @description User by id success
 */
export type GetApiUsersId200 = {
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
    password: string
    /**
     * @type string
     */
    avatarUrl: string | null
    /**
     * @type string
     */
    role: ResultRoleEnum7 | null
    /**
     * @type string
     */
    refreshToken: string | null
    /**
     * @minLength -2147483648
     * @maxLength 2147483647
     * @type integer
     */
    refreshTokenVersion: number | null
    /**
     * @type string
     */
    verificationToken: string | null
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

export const errorCodeEnum40 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum40 = (typeof errorCodeEnum40)[keyof typeof errorCodeEnum40]

/**
 * @description User by id validation error
 */
export type GetApiUsersId400 = {
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
    code?: ErrorCodeEnum40 | undefined
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

export const errorCodeEnum41 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum41 = (typeof errorCodeEnum41)[keyof typeof errorCodeEnum41]

/**
 * @description User by id not found error
 */
export type GetApiUsersId404 = {
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
    code?: ErrorCodeEnum41 | undefined
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

export const errorCodeEnum42 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum42 = (typeof errorCodeEnum42)[keyof typeof errorCodeEnum42]

/**
 * @description User by id internal server error
 */
export type GetApiUsersId500 = {
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
    code?: ErrorCodeEnum42 | undefined
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

export type GetApiUsersIdQueryResponse = GetApiUsersId200

export type GetApiUsersIdQuery = {
  Response: GetApiUsersId200
  PathParams: GetApiUsersIdPathParams
  Errors: GetApiUsersId400 | GetApiUsersId404 | GetApiUsersId500
}