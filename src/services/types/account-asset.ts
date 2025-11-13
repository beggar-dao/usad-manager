/**
 * Account asset params
 */
export interface AccountAssetParams {
  /**
     * 当前页面索引
     */
  pageNumber?: number;
  /**
   * 页面数目大小
   */
  pageSize?: number;
  /**
   * 用户 ID
   */
  userId?: string;
}

/**
 * Account asset status params
 */
export interface AccountAssetStatusParams {
  /**
     * ID
     */
  id?: number;
  /**
   * 状态（1：正常，2：冻结）
   */
  status?: number;
}

/**
 * Account asset item
 */
export interface AccountAssetItem {
  /**
     * 钱包账户 ID
     */
  accountId?: string;
  /**
   * 收款地址
   */
  address?: string;
  /**
   * 币种余额
   */
  balance?: string;
  /**
   * 链 ID
   */
  chainId?: string;
  /**
   * 创建时间
   */
  createTime?: number;
  /**
   * 币种标识
   */
  currency?: string;
  /**
   * 币种合约地址
   */
  currencyContractAddress?: string;
  /**
   * 币种精度
   */
  decimals?: string;
  /**
   * 冻结余额
   */
  freezeBalance?: string;
  /**
   * 主键 ID
   */
  id?: string;
  /**
   * 带处理金额
   */
  pendingBalance?: string;
  /**
   * 更新时间
   */
  updateTime?: number;
  /**
   * 用户 ID
   */
  userId?: string;
}

/**
 * Account asset response
 */
export interface AccountAssetResponse {
  list?: AccountAssetItem[];
  _meta: {
    currentPage: number;
    perPage: number;
    totalCount: number;
    totalPages: number;
  };
}