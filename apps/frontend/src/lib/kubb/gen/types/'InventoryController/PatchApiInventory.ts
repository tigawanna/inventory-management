export type PatchApiInventoryHeaderParams = {
  /**
   * @description Bearer token required if no access token cookie is set
   * @type string | undefined
   */
  Authorization?: string | undefined
}

/**
 * @description Inventory update successful
 */
export type PatchApiInventory200 = {
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

export const errorCodeEnum5 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum5 = (typeof errorCodeEnum5)[keyof typeof errorCodeEnum5]

/**
 * @description Inventory update validation error
 */
export type PatchApiInventory400 = {
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
    code?: ErrorCodeEnum5 | undefined
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

export const errorCodeEnum6 = {
  'login-required': 'login-required',
  'admin-required': 'admin-required',
  'parameters-required': 'parameters-required',
  'query-parametersRequired-required': 'query-parametersRequired-required',
  'payload-required': 'payload-required',
  'internal-server-error': 'internal-server-error',
  'not-found': 'not-found',
} as const

export type ErrorCodeEnum6 = (typeof errorCodeEnum6)[keyof typeof errorCodeEnum6]

/**
 * @description Inventory update internal server error
 */
export type PatchApiInventory500 = {
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
    code?: ErrorCodeEnum6 | undefined
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

export type PatchApiInventoryMutationRequest = {
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
  /**
   * @minLength -2147483648
   * @maxLength 2147483647
   * @type integer | undefined
   */
  quantity?: number | undefined
  /**
   * @type string | undefined
   */
  price?: string | undefined
  /**
   * @type string
   */
  categoryId?: (string | null) | undefined
  /**
   * @type string
   */
  sku?: (string | null) | undefined
  /**
   * @type boolean
   */
  isActive?: (boolean | null) | undefined
  /**
   * @type string
   */
  supplier?: (string | null) | undefined
  /**
   * @type string
   */
  location?: (string | null) | undefined
  /**
   * @type string
   */
  weight?: (string | null) | undefined
  /**
   * @type string
   */
  dimensions?: (string | null) | undefined
  /**
   * @type array
   */
  tags?: (string[] | null) | undefined
}

export type PatchApiInventoryMutationResponse = PatchApiInventory200

export type PatchApiInventoryMutation = {
  Response: PatchApiInventory200
  Request: PatchApiInventoryMutationRequest
  HeaderParams: PatchApiInventoryHeaderParams
  Errors: PatchApiInventory400 | PatchApiInventory500
}