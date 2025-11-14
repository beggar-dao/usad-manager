/**
 * User Management Types
 */


/**
 * User status enums
 */
export enum EmailVerificationStatus {
  Verified = 'verified',
  Unverified = 'unverified',
}

export enum KYCStatus {
  Draft = 0,
  Submitted = 1,
  Verified = 2,
  Rejected = 3,
}

/**
 *
 * UserResponse
 */
export interface UserResponseItem {
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 国家
   */
  country?: string;
  /**
   * 创建时间
   */
  createTime?: number;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 预估金额
   */
  estimatedAmount?: number;
  /**
   * 名
   */
  firstname?: string;
  /**
   * 用户 ID
   */
  id: string;
  /**
   * 是否开启两步验证
   */
  is2FA?: boolean;
  /**
   * ?是否购买过兑换码
   */
  isBuyRedeem?: boolean;
  /**
   * 姓
   */
  lastname?: string;
  /**
   * 省份
   */
  province?: string;
  /**
   * 状态
   */
  status?: number;
  /**
   * 时区
   */
  timezone?: string;
  /**
   * 两步验证密钥
   */
  twoFactorSecret?: string;
  /**
   * 更新时间
   */
  updateTime?: number;
  /**
   * 用户名
   */
  username?: string;
  /**
   * 实名认证状态（0：未审核，1：通过，2：未通过）
   */
  kycStatus?: number;
}

/**
 * User list query parameters
 */
export interface UserManagementParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string; // Search by UID, Email, or Full Name
  kycStatus?: string; // Filter by KYC status
  registryStartTime?: number; // Registration date range start
  registryEndTime?: number; // Registration date range end
}

/**
 *
 * OrderItem
 */
export interface OrderItem {
  asc?: boolean;
  column?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}

/**
 * User list response
 */
export interface UserManagementResponse {
  countId?: string;
  current?: number;
  maxLimit?: number;
  optimizeCountSql?: boolean;
  optimizeJoinOfCountSql?: boolean;
  orders?: OrderItem[];
  pages?: number;
  list?: UserResponseItem[];
  searchCount?: boolean;
  size?: number;
  total?: number;
}
