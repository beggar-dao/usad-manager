/**
 * User Profile API Service
 * Handles all user profile related API calls
 */

import { request } from '@umijs/max';
import type {
  UserRealNameResponse,
} from './types/user-real-name';

/**
 * Get user profile by ID
 * @param userId - User ID
 * @returns Promise<UserRealNameResponse>
 */
export function getUserRealNameProfile(userId: string): Promise<UserRealNameResponse> {
  return request<UserRealNameResponse>(`/user/real-name/${userId}`, {
    method: 'GET',
  });
}
