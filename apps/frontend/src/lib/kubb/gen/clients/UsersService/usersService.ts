import { deleteApiUsersClient } from './deleteApiUsersClient.ts'
import { getApiUsersClient } from './getApiUsersClient.ts'
import { getApiUsersIdClient } from './getApiUsersIdClient.ts'
import { patchApiUsersClient } from './patchApiUsersClient.ts'

export function usersService() {
  return { getApiUsersClient, patchApiUsersClient, deleteApiUsersClient, getApiUsersIdClient }
}