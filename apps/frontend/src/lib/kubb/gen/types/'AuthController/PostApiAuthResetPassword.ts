/**
 * @description Password reset successful
 */
export type PostApiAuthResetPassword200 = {
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

export const errorCodeEnum25 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum25 = (typeof errorCodeEnum25)[keyof typeof errorCodeEnum25]

/**
 * @description Password reset validation error
 */
export type PostApiAuthResetPassword400 = {
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
    code?: ErrorCodeEnum25 | undefined
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
 * @description Password reset errorr : User not found
 */
export type PostApiAuthResetPassword404 = {
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

export const errorCodeEnum26 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum26 = (typeof errorCodeEnum26)[keyof typeof errorCodeEnum26]

/**
 * @description Password reset internal error
 */
export type PostApiAuthResetPassword500 = {
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
    code?: ErrorCodeEnum26 | undefined
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

export type PostApiAuthResetPasswordMutationRequest = {
  /**
   * @type string
   */
  token: string
  /**
   * @type string
   */
  newPassword: string
}

export type PostApiAuthResetPasswordMutationResponse = PostApiAuthResetPassword200

export type PostApiAuthResetPasswordMutation = {
  Response: PostApiAuthResetPassword200
  Request: PostApiAuthResetPasswordMutationRequest
  Errors: PostApiAuthResetPassword400 | PostApiAuthResetPassword404 | PostApiAuthResetPassword500
}