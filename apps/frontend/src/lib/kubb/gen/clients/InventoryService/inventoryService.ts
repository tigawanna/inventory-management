import { deleteApiInventoryClient } from './deleteApiInventoryClient.ts'
import { getApiInventoryClient } from './getApiInventoryClient.ts'
import { getApiInventoryIdClient } from './getApiInventoryIdClient.ts'
import { patchApiInventoryClient } from './patchApiInventoryClient.ts'
import { postApiInventoryClient } from './postApiInventoryClient.ts'

export function inventoryService() {
  return { getApiInventoryClient, postApiInventoryClient, patchApiInventoryClient, deleteApiInventoryClient, getApiInventoryIdClient }
}