/**
 * @description Welcome to the Inventory API
 */
export type GetApiV1200 = {
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

export type GetApiV1QueryResponse = GetApiV1200

export type GetApiV1Query = {
  Response: GetApiV1200
  Errors: any
}