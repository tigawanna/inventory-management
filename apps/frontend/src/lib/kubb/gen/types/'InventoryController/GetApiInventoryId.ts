export type GetApiInventoryIdPathParams = {
  /**
   * @type string
   */
  id: string
}

/**
 * @description Inventpry by id success
 */
export type GetApiInventoryId200 = {
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
  }
  error?: unknown | undefined
}

export const errorCodeEnum10 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum10 = (typeof errorCodeEnum10)[keyof typeof errorCodeEnum10]

/**
 * @description Inventpry by id validation error
 */
export type GetApiInventoryId400 = {
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
    code?: ErrorCodeEnum10 | undefined
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

export const errorCodeEnum11 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum11 = (typeof errorCodeEnum11)[keyof typeof errorCodeEnum11]

/**
 * @description Inventpry by id not found error
 */
export type GetApiInventoryId404 = {
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
    code?: ErrorCodeEnum11 | undefined
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

export const errorCodeEnum12 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum12 = (typeof errorCodeEnum12)[keyof typeof errorCodeEnum12]

/**
 * @description Inventpry by id internal server error
 */
export type GetApiInventoryId500 = {
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
    code?: ErrorCodeEnum12 | undefined
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

export type GetApiInventoryIdQueryResponse = GetApiInventoryId200

export type GetApiInventoryIdQuery = {
  Response: GetApiInventoryId200
  PathParams: GetApiInventoryIdPathParams
  Errors: GetApiInventoryId400 | GetApiInventoryId404 | GetApiInventoryId500
}