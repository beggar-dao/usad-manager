/**
 * User Business Real Name API Service
 * Handles all business/corporate KYC related API calls
 */

import { request } from '@umijs/max';
import type { UserBusinessRealNameResponse } from './types/user-business-real-name';

/**
 * Get user business real name profile by ID
 * @param userId - User ID
 * @returns Promise<UserBusinessRealNameResponse>
 */
export function getUserBusinessRealNameProfile(
  userId: string,
): Promise<UserBusinessRealNameResponse> {
  return request<UserBusinessRealNameResponse>(`/user/business-real-name/${userId}`, {
    method: 'GET',
  });
}
