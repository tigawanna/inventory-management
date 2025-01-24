export const getApiInventoryQueryParamsOrderEnum = {
  asc: 'asc',
  desc: 'desc',
} as const

export type GetApiInventoryQueryParamsOrderEnum = (typeof getApiInventoryQueryParamsOrderEnum)[keyof typeof getApiInventoryQueryParamsOrderEnum]

export const getApiInventoryQueryParamsSortEnum = {
  name: 'name',
  price: 'price',
  quantity: 'quantity',
} as const

export type GetApiInventoryQueryParamsSortEnum = (typeof getApiInventoryQueryParamsSortEnum)[keyof typeof getApiInventoryQueryParamsSortEnum]

export type GetApiInventoryQueryParams = {
  /**
   * @default "1"
   * @type string | undefined
   */
  page?: string | undefined
  /**
   * @default "10"
   * @type string | undefined
   */
  limit?: string | undefined
  /**
   * @default "desc"
   * @type string | undefined
   */
  order?: GetApiInventoryQueryParamsOrderEnum | undefined
  /**
   * @type string | undefined
   */
  search?: string | undefined
  /**
   * @type string | undefined
   */
  sort?: GetApiInventoryQueryParamsSortEnum | undefined
  /**
   * @type string | undefined
   */
  categoryId?: string | undefined
}

/**
 * @description Inventpry listing success
 */
export type GetApiInventory200 = {
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
      /**
       * @minLength -2147483648
       * @maxLength 2147483647
       * @type integer
       */
      quantity: number
      /**
       * @type string
       */
      price: string
      /**
       * @type string
       */
      categoryId: string | null
      /**
       * @type string
       */
      sku: string | null
      /**
       * @type boolean
       */
      isActive: boolean | null
      /**
       * @type string
       */
      supplier: string | null
      /**
       * @type string
       */
      location: string | null
      /**
       * @type string
       */
      weight: string | null
      /**
       * @type string
       */
      dimensions: string | null
      /**
       * @type array
       */
      tags: string[] | null
    }[]
  }
  error?: unknown | undefined
}

export const errorCodeEnum2 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum2 = (typeof errorCodeEnum2)[keyof typeof errorCodeEnum2]

/**
 * @description Inventpry listing validation error
 */
export type GetApiInventory400 = {
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
    code?: ErrorCodeEnum2 | undefined
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

export const errorCodeEnum3 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum3 = (typeof errorCodeEnum3)[keyof typeof errorCodeEnum3]

/**
 * @description Inventpry listing internal server error
 */
export type GetApiInventory500 = {
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
    code?: ErrorCodeEnum3 | undefined
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

export type GetApiInventoryQueryResponse = GetApiInventory200

export type GetApiInventoryQuery = {
  Response: GetApiInventory200
  QueryParams: GetApiInventoryQueryParams
  Errors: GetApiInventory400 | GetApiInventory500
}