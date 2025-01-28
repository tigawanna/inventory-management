export type PatchApiCategoriesHeaderParams = {
  /**
   * @description Bearer token required if no access token cookie is set
   * @type string | undefined
   */
  Authorization?: string | undefined
}

/**
 * @description Categories update successful
 */
export type PatchApiCategories200 = {
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

export const errorCodeEnum45 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum45 = (typeof errorCodeEnum45)[keyof typeof errorCodeEnum45]

/**
 * @description Categories update validation error
 */
export type PatchApiCategories400 = {
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
    code?: ErrorCodeEnum45 | undefined
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
 * @description Categories update internal server error
 */
export type PatchApiCategories500 = {
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

export type PatchApiCategoriesMutationRequest = {
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
   * @type string
   */
  description?: (string | null) | undefined
}

export type PatchApiCategoriesMutationResponse = PatchApiCategories200

export type PatchApiCategoriesMutation = {
  Response: PatchApiCategories200
  Request: PatchApiCategoriesMutationRequest
  HeaderParams: PatchApiCategoriesHeaderParams
  Errors: PatchApiCategories400 | PatchApiCategories500
}