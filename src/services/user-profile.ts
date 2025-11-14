/**
 * User Profile API Service
 * Handles all user profile related API calls
 */

import { request } from '@umijs/max';
import type {
  UserProfile,
  UpdateUserProfileRequest,
  UpdateSecurityRequest,
  LoginHistoryParams,
  LoginHistoryResponse,
  TerminateSessionRequest,
  ChangePasswordRequest,
} from './types/user-profile';
import { ApiResponse } from './types/common';

/**
 * Get user profile by ID
 * @param userId - User ID
 * @returns Promise<UserProfile>
 */
export function getUserProfile(userId: string): Promise<ApiResponse<UserProfile>> {
  return request<ApiResponse<UserProfile>>(`/user/${userId}`, {
    method: 'GET',
  });
}

/**
 * Update user profile
 * @param userId - User ID
 * @param data - Updated profile data
 * @returns Promise<UserProfile>
 */
export function updateUserProfile(data: UpdateUserProfileRequest): Promise<UserProfile> {
  return request<UserProfile>(`/user`, {
    method: 'PUT',
    data,
  });
}

/**
 * Update user security settings
 * @param userId - User ID
 * @param data - Security settings data
 * @returns Promise<{ success: boolean }>
 */
export function updateUserSecurity(
  userId: string,
  data: UpdateSecurityRequest,
): Promise<{ success: boolean }> {
  return request<{ success: boolean }>(`/user/${userId}/security`, {
    method: 'PUT',
    data,
  });
}

/**
 * Change user password (admin action)
 * @param data - Change password request
 * @returns Promise<{ success: boolean }>
 */
export function changeUserPassword(
  data: ChangePasswordRequest,
): Promise<{ success: boolean }> {
  return request<{ success: boolean }>(`/user/${data.userId}/password`, {
    method: 'POST',
    data: { newPassword: data.newPassword },
  });
}

/**
 * Get user login history
 * @param params - Query parameters
 * @returns Promise<LoginHistoryResponse>
 */
export function getLoginHistory(
  params: LoginHistoryParams,
): Promise<LoginHistoryResponse> {
  return request<LoginHistoryResponse>(`/user/${params.userId}/login-history`, {
    method: 'GET',
    params,
  });
}

/**
 * Terminate active session
 * @param data - Terminate session request
 * @returns Promise<{ success: boolean }>
 */
export function terminateSession(
  data: TerminateSessionRequest,
): Promise<{ success: boolean }> {
  return request<{ success: boolean }>(`/user/${data.userId}/terminate-session`, {
    method: 'POST',
    data: { sessionId: data.sessionId },
  });
}
