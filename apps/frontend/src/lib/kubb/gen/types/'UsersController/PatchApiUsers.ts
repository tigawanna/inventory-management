export type PatchApiUsersHeaderParams = {
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
 * @description Users update successful
 */
export type PatchApiUsers200 = {
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
 * @description Users update validation error
 */
export type PatchApiUsers400 = {
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
 * @description Users update internal server error
 */
export type PatchApiUsers500 = {
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

export const patchApiUsersMutationRequestRoleEnum = {
  admin: 'admin',
  user: 'user',
} as const

export type PatchApiUsersMutationRequestRoleEnum = (typeof patchApiUsersMutationRequestRoleEnum)[keyof typeof patchApiUsersMutationRequestRoleEnum]

export type PatchApiUsersMutationRequest = {
  /**
   * @type string
   */
  id: string
  /**
   * @type string
   */
  updated_at?: (string | null) | undefined
  /**
   * @type string
   */
  created_at?: (string | null) | undefined
  /**
   * @type string | undefined
   */
  name?: string | undefined
  /**
   * @type string | undefined
   */
  email?: string | undefined
  /**
   * @type string | undefined
   */
  password?: string | undefined
  /**
   * @type string
   */
  avatarUrl?: (string | null) | undefined
  /**
   * @type string
   */
  role?: (PatchApiUsersMutationRequestRoleEnum | null) | undefined
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
  /**
   * @type string
   */
  lastLoginAt?: (string | null) | undefined
  /**
   * @type object
   */
  metadata: {
    [key: string]: unknown
  } | null
}

export type PatchApiUsersMutationResponse = PatchApiUsers200

export type PatchApiUsersMutation = {
  Response: PatchApiUsers200
  Request: PatchApiUsersMutationRequest
  HeaderParams: PatchApiUsersHeaderParams
  Errors: PatchApiUsers400 | PatchApiUsers500
}