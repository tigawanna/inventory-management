export type PatchApiUsersHeaderParams = {
  /**
   * @description Bearer token required if no access token cookie is set
   * @type string | undefined
   */
  Authorization?: string | undefined
}

export const resultRoleEnum6 = {
  admin: 'admin',
  user: 'user',
} as const

export type ResultRoleEnum6 = (typeof resultRoleEnum6)[keyof typeof resultRoleEnum6]

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
    role: ResultRoleEnum6 | null
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

export const errorCodeEnum36 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum36 = (typeof errorCodeEnum36)[keyof typeof errorCodeEnum36]

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
    code?: ErrorCodeEnum36 | undefined
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

export const errorCodeEnum37 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum37 = (typeof errorCodeEnum37)[keyof typeof errorCodeEnum37]

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
    code?: ErrorCodeEnum37 | undefined
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
}

export type PatchApiUsersMutationResponse = PatchApiUsers200

export type PatchApiUsersMutation = {
  Response: PatchApiUsers200
  Request: PatchApiUsersMutationRequest
  HeaderParams: PatchApiUsersHeaderParams
  Errors: PatchApiUsers400 | PatchApiUsers500
}