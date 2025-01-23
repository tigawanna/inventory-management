export const resultRoleEnum2 = {
  admin: 'admin',
  user: 'user',
} as const

export type ResultRoleEnum2 = (typeof resultRoleEnum2)[keyof typeof resultRoleEnum2]

/**
 * @description Email verification successful
 */
export type PostApiAuthVerifyEmail200 = {
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
    role: ResultRoleEnum2 | null
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
  }
  error?: unknown | undefined
}

export const errorCodeEnum16 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum16 = (typeof errorCodeEnum16)[keyof typeof errorCodeEnum16]

/**
 * @description Email verification validation error
 */
export type PostApiAuthVerifyEmail400 = {
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
    code?: ErrorCodeEnum16 | undefined
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

/**
 * @description Email verification errorr : User not found
 */
export type PostApiAuthVerifyEmail404 = {
  result?: unknown | undefined
  /**
   * @type object
   */
  error: {
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

export const errorCodeEnum17 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum17 = (typeof errorCodeEnum17)[keyof typeof errorCodeEnum17]

/**
 * @description Email verification internal error
 */
export type PostApiAuthVerifyEmail500 = {
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
    code?: ErrorCodeEnum17 | undefined
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

export type PostApiAuthVerifyEmailMutationRequest = {
  /**
   * @type string | undefined, email
   */
  email?: string | undefined
  /**
   * @type string | undefined
   */
  token?: string | undefined
}

export type PostApiAuthVerifyEmailMutationResponse = PostApiAuthVerifyEmail200

export type PostApiAuthVerifyEmailMutation = {
  Response: PostApiAuthVerifyEmail200
  Request: PostApiAuthVerifyEmailMutationRequest
  Errors: PostApiAuthVerifyEmail400 | PostApiAuthVerifyEmail404 | PostApiAuthVerifyEmail500
}