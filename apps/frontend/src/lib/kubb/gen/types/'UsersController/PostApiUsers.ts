export type PostApiUsersHeaderParams = {
  /**
   * @description Bearer token required if no access token cookie is set
   * @type string | undefined
   */
  Authorization?: string | undefined
}

export const resultRoleEnum5 = {
  admin: 'admin',
  user: 'user',
} as const

export type ResultRoleEnum5 = (typeof resultRoleEnum5)[keyof typeof resultRoleEnum5]

/**
 * @description Users creation successful
 */
export type PostApiUsers200 = {
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
    role: ResultRoleEnum5 | null
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
  }
  error?: unknown | undefined
}

export const errorCodeEnum33 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum33 = (typeof errorCodeEnum33)[keyof typeof errorCodeEnum33]

/**
 * @description Users creation validation error
 */
export type PostApiUsers400 = {
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
    code?: ErrorCodeEnum33 | undefined
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

export const errorCodeEnum34 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum34 = (typeof errorCodeEnum34)[keyof typeof errorCodeEnum34]

/**
 * @description Users creation internal server error
 */
export type PostApiUsers500 = {
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
    code?: ErrorCodeEnum34 | undefined
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

export const postApiUsersMutationRequestRoleEnum = {
  admin: 'admin',
  user: 'user',
} as const

export type PostApiUsersMutationRequestRoleEnum = (typeof postApiUsersMutationRequestRoleEnum)[keyof typeof postApiUsersMutationRequestRoleEnum]

export type PostApiUsersMutationRequest = {
  /**
   * @type string | undefined
   */
  id?: string | undefined
  /**
   * @type string
   */
  updated_at?: (string | null) | undefined
  /**
   * @type string
   */
  created_at?: (string | null) | undefined
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
  avatarUrl?: (string | null) | undefined
  /**
   * @type string
   */
  role?: (PostApiUsersMutationRequestRoleEnum | null) | undefined
  /**
   * @type string
   */
  refreshToken?: (string | null) | undefined
  /**
   * @minLength -2147483648
   * @maxLength 2147483647
   * @type integer
   */
  refreshTokenVersion?: (number | null) | undefined
  /**
   * @type string
   */
  verificationToken?: (string | null) | undefined
  /**
   * @type boolean
   */
  isEmailVerified?: (boolean | null) | undefined
}

export type PostApiUsersMutationResponse = PostApiUsers200

export type PostApiUsersMutation = {
  Response: PostApiUsers200
  Request: PostApiUsersMutationRequest
  HeaderParams: PostApiUsersHeaderParams
  Errors: PostApiUsers400 | PostApiUsers500
}