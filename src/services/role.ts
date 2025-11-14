/**
 * Role API Service
 * Handles all role and permission related API calls
 */

import { request } from '@umijs/max';
import type { RoleResponse } from './types/role';
import { ApiResponse } from './types/common';

/**
 * Get all roles
 * @returns Promise<RoleResponse[]>
 */
export function getRoles(): Promise<ApiResponse<RoleResponse>> {
  return request<ApiResponse<RoleResponse>>('/permission/role', {
    method: 'GET',
  });
}

/**
 * Get role by ID
 * @param roleId - Role ID
 * @returns Promise<RoleResponse>
 */
export function getRoleById(roleId: number): Promise<RoleResponse> {
  return request<RoleResponse>(`/permission/role/${roleId}`, {
    method: 'GET',
  });
}

/**
 * Create a new role
 * @param data - Role data
 * @returns Promise<RoleResponse>
 */
export function createRole(data: Partial<RoleResponse>): Promise<RoleResponse> {
  return request<RoleResponse>('/permission/role', {
    method: 'POST',
    data,
  });
}

/**
 * Update an existing role
 * @param roleId - Role ID
 * @param data - Updated role data
 * @returns Promise<RoleResponse>
 */
export function updateRole(roleId: number, data: Partial<RoleResponse>): Promise<RoleResponse> {
  return request<RoleResponse>(`/permission/role/${roleId}`, {
    method: 'PUT',
    data,
  });
}

/**
 * Delete a role
 * @param roleId - Role ID
 * @returns Promise<void>
 */
export function deleteRole(roleId: number): Promise<void> {
  return request<void>(`/permission/role/${roleId}`, {
    method: 'DELETE',
  });
}
