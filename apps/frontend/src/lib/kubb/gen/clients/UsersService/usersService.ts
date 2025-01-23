import { deleteApiUsersClient } from './deleteApiUsersClient.ts'
import { getApiUsersClient } from './getApiUsersClient.ts'
import { getApiUsersIdClient } from './getApiUsersIdClient.ts'
import { patchApiUsersClient } from './patchApiUsersClient.ts'
import { postApiUsersClient } from './postApiUsersClient.ts'

export function usersService() {
  return { getApiUsersClient, postApiUsersClient, patchApiUsersClient, deleteApiUsersClient, getApiUsersIdClient }
}