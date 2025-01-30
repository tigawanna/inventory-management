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

export const errorCodeEnum47 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum47 = (typeof errorCodeEnum47)[keyof typeof errorCodeEnum47]

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
    code?: ErrorCodeEnum47 | undefined
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

export const errorCodeEnum48 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum48 = (typeof errorCodeEnum48)[keyof typeof errorCodeEnum48]

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
    code?: ErrorCodeEnum48 | undefined
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

export const errorCodeEnum49 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum49 = (typeof errorCodeEnum49)[keyof typeof errorCodeEnum49]

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
    code?: ErrorCodeEnum49 | undefined
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