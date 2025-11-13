export interface WhitelistAddress {
  /**
     * 地址
     */
  address?: string;
  /**
   * 链类型
   */
  chainType?: string;
  /**
   * 创建时间
   */
  createTime?: number;
  /**
   * 币种
   */
  currency?: string;
  /**
   * ID
   */
  id?: number;
  /**
   * 是否需要二次认证
   */
  isSecondaryAuth?: number;
  /**
   * 状态（0：未解锁，1：已解锁）
   */
  status?: number;
  /**
   * 标签
   */
  tag?: string;
  /**
   * 解锁时间
   */
  unlockTime?: number;
  /**
   * 更新时间
   */
  updateTime?: number;
  /**
   * 用户 ID
   */
  userId?: number;
}

export interface WhitelistAddressParams {
  userId: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface WhitelistAddressResponse {
  total?: number;
  list?: WhitelistAddress[];
}