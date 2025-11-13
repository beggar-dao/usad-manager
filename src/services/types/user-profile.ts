/**
 * User Profile Types
 * Types for user account info, security settings, and login history
 */

/**
 * Account Status Enum
 */
export enum AccountStatus {
  Active = 0,
  Locked = 1,
  WithdrawalsBlocked = 2,
  Deactivated = 3,
}

/**
 * User Role Enum
 */
export enum UserRole {
  User = 'user',
  AdminSupport = 'admin_support',
  SuperAdmin = 'super_admin',
  FinanceManagement = 'finance_management',
  KYCKYB = 'kyc_kyb',
}

/**
 * Two-Factor Authentication Status
 */
export enum TwoFactorStatus {
  Enabled = 1,
  Disabled = 0,
}

/**
 * Login Source Enum
 */
export enum LoginSource {
  Web = 'web',
  MobileApp = 'mobile_app',
  API = 'api',
}

/**
 * Device Type Enum
 */
export enum DeviceType {
  Mac = 'mac',
  Windows = 'windows',
  Android = 'android',
  iOS = 'ios',
  Other = 'other',
}

/**
 * User Profile Detail
 */
export interface UserProfile {
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
   * 实名认证状态（0：未审核，1：通过，2：未通过）
   */
  kycStatus?: number;
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
   * 角色 ID
   */
  roleId?: number;
}

/**
 * Update User Profile Request
 */
export interface UpdateUserProfileRequest {
  id: string;
  firstname?: string;
  lastname?: string;
  country?: string;
  is2FA?: boolean;
  status?: number;
  roleId?: number;
  password?: string;
}

/**
 * Update Security Settings Request
 */
export interface UpdateSecurityRequest {
  is2FA?: boolean;
  newPassword?: string;
}

/**
 * Login History Item
 */
export interface LoginHistoryItem {
  id: string;
  userId: string;
  loginTime: number;
  loginIp: string;
  logoutTime?: number;
  loginDuration?: number; // in minutes
  loginSource: LoginSource;
  deviceType: DeviceType;
  isActive: boolean;
  sessionId?: string;
}

/**
 * Login History Query Parameters
 */
export interface LoginHistoryParams {
  userId: string;
  pageNumber?: number;
  pageSize?: number;
  startTime?: number;
  endTime?: number;
  loginIp?: string;
  loginSource?: LoginSource;
  deviceType?: DeviceType;
}

/**
 * Login History Response
 */
export interface LoginHistoryResponse {
  list: LoginHistoryItem[];
  _meta: {
    currentPage: number;
    perPage: number;
    totalCount: number;
    totalPages: number;
  };
}

/**
 * Terminate Session Request
 */
export interface TerminateSessionRequest {
  sessionId: string;
  userId: string;
}

/**
 * Change Password Request
 */
export interface ChangePasswordRequest {
  userId: string;
  newPassword: string;
}
