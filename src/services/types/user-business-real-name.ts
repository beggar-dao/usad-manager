/**
 * User Business Real Name Response
 * Business/Corporate KYC verification data
 */
export interface UserBusinessRealNameResponse {
  /**
    * 公司名称
    */
  companyName?: string;
  /**
   * 创建时间
   */
  createTime?: number;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 认证失败原因
   */
  failReason?: string;
  /**
   * 企业来源（0：美国以外，1：美国）
   */
  form?: number;
  /**
   * 主键
   */
  id?: string;
  /**
   * 行业描述
   */
  industryDescription?: string;
  /**
   * 法定地址
   */
  legalAddress?: string;
  /**
   * 国家
   */
  nationality?: string;
  /**
   * 预计投资（每年）
   */
  plannedInvestment?: string;
  /**
   * 注册号
   */
  registrationNumber?: string;
  /**
   * 审核时间
   */
  reviewTime?: number;
  /**
   * 实名认证状态（0：草稿，1：未审核，2：通过，3：未通过）
   */
  status?: number;
  /**
   * 税号
   */
  taxId?: string;
  /**
   * 更新时间
   */
  updateTime?: number;
  /**
   * 用户 ID
   */
  userId?: string;
}
