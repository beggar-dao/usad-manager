/**
 * 返回数据体
 *
 * UserRealNameResponse
 */
export interface UserRealNameResponse {
  /**
   * 地址证明
   */
  addressProof?: string;
  /**
   * 年收入
   */
  annualEarnings?: string;
  /**
   * 出生国家
   */
  birthCountry?: string;
  /**
   * 出生日期
   */
  birthday?: string;
  /**
   * 证件国家
   */
  certificateCountry?: string;
  /**
   * 证件号码
   */
  certificateNumber?: string;
  /**
   * 证件类型（0：Passport，1：Driving Licence，2：National ID）
   */
  certificateType?: number;
  /**
   * 城市
   */
  city?: string;
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
   * 预计资产总额
   */
  estimatedTotalWealth?: string;
  /**
   * 认证失败原因
   */
  failReason?: string;
  /**
   * 姓
   */
  firstname?: string;
  /**
   * 证件照片正面
   */
  firstPhoto?: string;
  /**
   * 证件照片正面 Base64
   */
  firstPhotoData?: string;
  /**
   * 主键 ID
   */
  id?: string;
  /**
   * 名
   */
  lastname?: string;
  /**
   * 国籍
   */
  nationality?: string;
  /**
   * 职业描述
   */
  occupationDescription?: string;
  /**
   * 个人照片
   */
  personalPhoto?: string;
  /**
   * 个人照片 Base64
   */
  personalPhotoData?: string;
  /**
   * 预计投资金额
   */
  plannedAnnualInvestment?: string;
  /**
   * 邮编
   */
  postcode?: string;
  /**
   * 职业状态
   */
  professionalStatus?: number;
  /**
   * 省份
   */
  province?: string;
  /**
   * 审核时间
   */
  reviewTime?: number;
  /**
   * 证件照片反面
   */
  secondPhoto?: string;
  /**
   * 证件照片反面 Base64
   */
  secondPhotoData?: string;
  /**
   * 资金来源
   */
  sourceOfFunds?: string;
  /**
   * 实名认证状态（0：草稿，1：未审核，2：通过，3：未通过）
   */
  status?: number;
  /**
   * 街道
   */
  street?: string;
  /**
   * 更新时间
   */
  updateTime?: number;
  /**
   * 用户 ID
   */
  userId?: string;
}