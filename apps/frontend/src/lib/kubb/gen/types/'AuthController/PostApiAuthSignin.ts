export const resultRoleEnum3 = {
  admin: 'admin',
  user: 'user',
} as const

export type ResultRoleEnum3 = (typeof resultRoleEnum3)[keyof typeof resultRoleEnum3]

/**
 * @description User signin successfully
 */
export type PostApiAuthSignin200 = {
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
    role: ResultRoleEnum3 | null
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

export const errorCodeEnum21 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum21 = (typeof errorCodeEnum21)[keyof typeof errorCodeEnum21]

/**
 * @description User signin validation error
 */
export type PostApiAuthSignin400 = {
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
    code?: ErrorCodeEnum21 | undefined
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

export const errorCodeEnum22 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum22 = (typeof errorCodeEnum22)[keyof typeof errorCodeEnum22]

/**
 * @description User signin internal error
 */
export type PostApiAuthSignin500 = {
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
    code?: ErrorCodeEnum22 | undefined
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

export type PostApiAuthSigninMutationRequest = {
  /**
   * @type string, email
   */
  email: string
  /**
   * @type string
   */
  password: string
}

export type PostApiAuthSigninMutationResponse = PostApiAuthSignin200

export type PostApiAuthSigninMutation = {
  Response: PostApiAuthSignin200
  Request: PostApiAuthSigninMutationRequest
  Errors: PostApiAuthSignin400 | PostApiAuthSignin500
}