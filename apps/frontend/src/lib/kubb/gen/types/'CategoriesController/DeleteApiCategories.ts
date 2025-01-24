export type DeleteApiCategoriesHeaderParams = {
  /**
   * @description Bearer token required if no access token cookie is set
   * @type string | undefined
   */
  Authorization?: string | undefined
}

/**
 * @description Categories deletion successful
 */
export type DeleteApiCategories200 = {
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

export const errorCodeEnum50 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum50 = (typeof errorCodeEnum50)[keyof typeof errorCodeEnum50]

/**
 * @description Categories deletion validation error
 */
export type DeleteApiCategories400 = {
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
    code?: ErrorCodeEnum50 | undefined
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

export const errorCodeEnum51 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum51 = (typeof errorCodeEnum51)[keyof typeof errorCodeEnum51]

/**
 * @description Categories deletion not found error
 */
export type DeleteApiCategories404 = {
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
    code?: ErrorCodeEnum51 | undefined
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

export const errorCodeEnum52 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum52 = (typeof errorCodeEnum52)[keyof typeof errorCodeEnum52]

/**
 * @description Categories deletion internal server error
 */
export type DeleteApiCategories500 = {
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
    code?: ErrorCodeEnum52 | undefined
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

export type DeleteApiCategoriesMutationRequest = {
  /**
   * @type string
   */
  id: string
}

export type DeleteApiCategoriesMutationResponse = DeleteApiCategories200

export type DeleteApiCategoriesMutation = {
  Response: DeleteApiCategories200
  Request: DeleteApiCategoriesMutationRequest
  HeaderParams: DeleteApiCategoriesHeaderParams
  Errors: DeleteApiCategories400 | DeleteApiCategories404 | DeleteApiCategories500
}