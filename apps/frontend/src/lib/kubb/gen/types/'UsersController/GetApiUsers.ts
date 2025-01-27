export const getApiUsersQueryParamsOrderEnum = {
  asc: 'asc',
  desc: 'desc',
} as const

export type GetApiUsersQueryParamsOrderEnum = (typeof getApiUsersQueryParamsOrderEnum)[keyof typeof getApiUsersQueryParamsOrderEnum]

export const getApiUsersQueryParamsSortEnum = {
  created_at: 'created_at',
} as const

export type GetApiUsersQueryParamsSortEnum = (typeof getApiUsersQueryParamsSortEnum)[keyof typeof getApiUsersQueryParamsSortEnum]

export type GetApiUsersQueryParams = {
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
  order?: GetApiUsersQueryParamsOrderEnum | undefined
  /**
   * @type string | undefined
   */
  search?: string | undefined
  /**
   * @type string | undefined
   */
  sort?: GetApiUsersQueryParamsSortEnum | undefined
}

export const itemsRoleEnum = {
  admin: 'admin',
  user: 'user',
} as const

export type ItemsRoleEnum = (typeof itemsRoleEnum)[keyof typeof itemsRoleEnum]

/**
 * @description Users listing success
 */
export type GetApiUsers200 = {
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
      email: string
      /**
       * @type string
       */
      avatarUrl: string | null
      /**
       * @type string
       */
      role: ItemsRoleEnum | null
      /**
       * @type boolean
       */
      isEmailVerified: boolean | null
      /**
       * @type string
       */
      lastLoginAt: string | null
      /**
       * @type object
       */
      metadata: {
        [key: string]: unknown
      } | null
    }[]
  }
  error?: unknown | undefined
}

export const errorCodeEnum31 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum31 = (typeof errorCodeEnum31)[keyof typeof errorCodeEnum31]

/**
 * @description Users listing validation error
 */
export type GetApiUsers400 = {
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
    code?: ErrorCodeEnum31 | undefined
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

export const errorCodeEnum32 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum32 = (typeof errorCodeEnum32)[keyof typeof errorCodeEnum32]

/**
 * @description Users listing internal server error
 */
export type GetApiUsers500 = {
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
    code?: ErrorCodeEnum32 | undefined
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

export type GetApiUsersQueryResponse = GetApiUsers200

export type GetApiUsersQuery = {
  Response: GetApiUsers200
  QueryParams: GetApiUsersQueryParams
  Errors: GetApiUsers400 | GetApiUsers500
}