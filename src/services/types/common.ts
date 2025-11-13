/**
 * Common API Types and Interfaces
 * Shared types used across all API services
 */

/**
 * Standard API Response wrapper
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  code?: string;
  timestamp?: string;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  current?: number;
  pageSize?: number;
  keyword?: string;
}

/**
 * Pagination response
 */
export interface PaginationResponse<T> {
  list: T[];
  total: number;
  current: number;
  pageSize: number;
}

/**
 * Token storage interface
 */
export interface TokenStorage {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
  tokenType?: string;
}
