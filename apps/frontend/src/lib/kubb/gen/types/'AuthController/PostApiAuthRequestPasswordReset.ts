/**
 * @description Password reset request successful
 */
export type PostApiAuthRequestPasswordReset200 = {
  /**
   * @type object
   */
  result: {
    /**
     * @type string
     */
    message: string
  }
  error?: unknown | undefined
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
 * @description Password reset request validation error
 */
export type PostApiAuthRequestPasswordReset400 = {
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

/**
 * @description Password reset request errorr : User not found
 */
export type PostApiAuthRequestPasswordReset404 = {
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

export const errorCodeEnum23 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum23 = (typeof errorCodeEnum23)[keyof typeof errorCodeEnum23]

/**
 * @description Password reset request internal error
 */
export type PostApiAuthRequestPasswordReset500 = {
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
    code?: ErrorCodeEnum23 | undefined
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

export type PostApiAuthRequestPasswordResetMutationRequest = {
  /**
   * @type string, email
   */
  email: string
}

export type PostApiAuthRequestPasswordResetMutationResponse = PostApiAuthRequestPasswordReset200

export type PostApiAuthRequestPasswordResetMutation = {
  Response: PostApiAuthRequestPasswordReset200
  Request: PostApiAuthRequestPasswordResetMutationRequest
  Errors: PostApiAuthRequestPasswordReset400 | PostApiAuthRequestPasswordReset404 | PostApiAuthRequestPasswordReset500
}