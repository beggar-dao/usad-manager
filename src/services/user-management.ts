/**
 * User Management API Service
 * Handles all user management related API calls
 */

import { request } from '@umijs/max';
import type {
  UserManagementParams,
  UserManagementResponse,
} from './types/user-management';

/**
 * Get user list with filters and pagination
 * @param params - Query parameters for filtering and pagination
 * @returns Promise<UserManagementResponse>
 */
export function getUserList(params: UserManagementParams) {
  return request<UserManagementResponse>(
    '/user',
    {
      method: 'GET',
      params,
    },
  )
}

/**
 * Export for convenience
 */
export { UserManagementParams, UserManagementResponse };
