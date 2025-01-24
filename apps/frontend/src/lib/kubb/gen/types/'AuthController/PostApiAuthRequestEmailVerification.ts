/**
 * @description Email verification request successful
 */
export type PostApiAuthRequestEmailVerification200 = {
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

export const errorCodeEnum19 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum19 = (typeof errorCodeEnum19)[keyof typeof errorCodeEnum19]

/**
 * @description Email verification request validation error
 */
export type PostApiAuthRequestEmailVerification400 = {
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
    code?: ErrorCodeEnum19 | undefined
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
 * @description Email verification request errorr : User not found
 */
export type PostApiAuthRequestEmailVerification404 = {
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

export const errorCodeEnum20 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum20 = (typeof errorCodeEnum20)[keyof typeof errorCodeEnum20]

/**
 * @description Email verification request internal error
 */
export type PostApiAuthRequestEmailVerification500 = {
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
    code?: ErrorCodeEnum20 | undefined
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

export type PostApiAuthRequestEmailVerificationMutationRequest = {
  /**
   * @type string, email
   */
  email: string
}

export type PostApiAuthRequestEmailVerificationMutationResponse = PostApiAuthRequestEmailVerification200

export type PostApiAuthRequestEmailVerificationMutation = {
  Response: PostApiAuthRequestEmailVerification200
  Request: PostApiAuthRequestEmailVerificationMutationRequest
  Errors: PostApiAuthRequestEmailVerification400 | PostApiAuthRequestEmailVerification404 | PostApiAuthRequestEmailVerification500
}