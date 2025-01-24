export type PostApiCategoriesHeaderParams = {
  /**
   * @description Bearer token required if no access token cookie is set
   * @type string | undefined
   */
  Authorization?: string | undefined
}

/**
 * @description Categories creation successful
 */
export type PostApiCategories200 = {
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
    description: string | null
  }
  error?: unknown | undefined
}

export const errorCodeEnum46 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum46 = (typeof errorCodeEnum46)[keyof typeof errorCodeEnum46]

/**
 * @description Categories creation validation error
 */
export type PostApiCategories400 = {
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
    code?: ErrorCodeEnum46 | undefined
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
 * @description Categories creation internal server error
 */
export type PostApiCategories500 = {
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

export type PostApiCategoriesMutationRequest = {
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
  description?: (string | null) | undefined
}

export type PostApiCategoriesMutationResponse = PostApiCategories200

export type PostApiCategoriesMutation = {
  Response: PostApiCategories200
  Request: PostApiCategoriesMutationRequest
  HeaderParams: PostApiCategoriesHeaderParams
  Errors: PostApiCategories400 | PostApiCategories500
}