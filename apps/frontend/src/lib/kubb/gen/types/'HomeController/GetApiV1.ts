/**
 * @description Welcome to  the V1 of invemtpry api
 * @example [object Object]
 */
export type GetApiV1200 = {
  /**
   * @type string
   */
  message: string
}

export type GetApiV1QueryResponse = GetApiV1200

export type GetApiV1Query = {
  Response: GetApiV1200
  Errors: any
}