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