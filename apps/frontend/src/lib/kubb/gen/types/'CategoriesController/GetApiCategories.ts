export const getApiCategoriesQueryParamsOrderEnum = {
  asc: 'asc',
  desc: 'desc',
} as const

export type GetApiCategoriesQueryParamsOrderEnum = (typeof getApiCategoriesQueryParamsOrderEnum)[keyof typeof getApiCategoriesQueryParamsOrderEnum]

export const getApiCategoriesQueryParamsSortEnum = {
  created_at: 'created_at',
  name: 'name',
} as const

export type GetApiCategoriesQueryParamsSortEnum = (typeof getApiCategoriesQueryParamsSortEnum)[keyof typeof getApiCategoriesQueryParamsSortEnum]

export type GetApiCategoriesQueryParams = {
  /**
   * @default 1
   * @type number
   */
  page?: (number | null) | undefined
  /**
   * @default 10
   * @type number
   */
  limit?: (number | null) | undefined
  /**
   * @default "desc"
   * @type string | undefined
   */
  order?: GetApiCategoriesQueryParamsOrderEnum | undefined
  /**
   * @type string | undefined
   */
  search?: string | undefined
  /**
   * @type string | undefined
   */
  sort?: GetApiCategoriesQueryParamsSortEnum | undefined
}

/**
 * @description Categories listing success
 */
export type GetApiCategories200 = {
  /**
   * @type object
   */
  result: {
    /**
     * @type number
     */
    page: number | null
    /**
     * @type number
     */
    perPage: number | null
    /**
     * @type number
     */
    totalItems: number | null
    /**
     * @type number
     */
    totalPages: number | null
    /**
     * @type array
     */
    items: {
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
    }[]
  }
  error?: unknown | undefined
}

export const errorCodeEnum41 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum41 = (typeof errorCodeEnum41)[keyof typeof errorCodeEnum41]

/**
 * @description Categories listing validation error
 */
export type GetApiCategories400 = {
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
    code?: ErrorCodeEnum41 | undefined
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

export const errorCodeEnum42 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum42 = (typeof errorCodeEnum42)[keyof typeof errorCodeEnum42]

/**
 * @description Categories listing internal server error
 */
export type GetApiCategories500 = {
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
    code?: ErrorCodeEnum42 | undefined
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

export type GetApiCategoriesQueryResponse = GetApiCategories200

export type GetApiCategoriesQuery = {
  Response: GetApiCategories200
  QueryParams: GetApiCategoriesQueryParams
  Errors: GetApiCategories400 | GetApiCategories500
}