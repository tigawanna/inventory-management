export const operations = {
  'get_api-v1': {
    path: '/api/v1',
    method: 'get',
  },
  'get_api-inventory': {
    path: '/api/inventory',
    method: 'get',
  },
  'post_api-inventory': {
    path: '/api/inventory',
    method: 'post',
  },
  'patch_api-inventory': {
    path: '/api/inventory',
    method: 'patch',
  },
  'delete_api-inventory': {
    path: '/api/inventory',
    method: 'delete',
  },
  'get_api-inventory-id': {
    path: '/api/inventory/:id',
    method: 'get',
  },
  'post_api-auth-signup': {
    path: '/api/auth/signup',
    method: 'post',
  },
  'post_api-auth-verify-email': {
    path: '/api/auth/verify-email',
    method: 'post',
  },
  'post_api-auth-request-email-verification': {
    path: '/api/auth/request-email-verification',
    method: 'post',
  },
  'post_api-auth-signin': {
    path: '/api/auth/signin',
    method: 'post',
  },
  'post_api-auth-request-password-reset': {
    path: '/api/auth/request-password-reset',
    method: 'post',
  },
  'post_api-auth-reset-password': {
    path: '/api/auth/reset-password',
    method: 'post',
  },
  'post_api-auth-signout': {
    path: '/api/auth/signout',
    method: 'post',
  },
  'get_api-auth-me': {
    path: '/api/auth/me',
    method: 'get',
  },
  'get_api-users': {
    path: '/api/users',
    method: 'get',
  },
  'patch_api-users': {
    path: '/api/users',
    method: 'patch',
  },
  'delete_api-users': {
    path: '/api/users',
    method: 'delete',
  },
  'get_api-users-id': {
    path: '/api/users/:id',
    method: 'get',
  },
  'get_api-categories': {
    path: '/api/categories',
    method: 'get',
  },
  'post_api-categories': {
    path: '/api/categories',
    method: 'post',
  },
  'patch_api-categories': {
    path: '/api/categories',
    method: 'patch',
  },
  'delete_api-categories': {
    path: '/api/categories',
    method: 'delete',
  },
  'get_api-categories-id': {
    path: '/api/categories/:id',
    method: 'get',
  },
  'get_api-auditlogs': {
    path: '/api/auditlogs',
    method: 'get',
  },
  'get_api-auditlogs-id': {
    path: '/api/auditlogs/:id',
    method: 'get',
  },
} as const