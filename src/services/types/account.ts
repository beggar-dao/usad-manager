/**
 * Account transaction list params
 */
export interface AccountTransactionParams {
  /**
   * 链 ID
   */
  chainId?: string;
  /**
   * 币种
   */
  currency?: string;
  /**
   * 搜索关键词
   */
  keyword?: string;
  /**
   * 当前页面索引
   */
  pageNumber?: number;
  /**
   * 页面数目大小
   */
  pageSize?: number;
  /**
   * 状态（0：待审核，1：审核成功，2：审核驳回，3：交易成功，4：交易失败）
   */
  status?: number;
  /**
   * 交易类型（1：CHAIN_DEPOSIT，2：CHAIN_WITHDRAWAL，3：FIAT_DEPOSIT，4：FIAT_WITHDRAWAL）
   */
  tradeType?: number;
  /**
   * 用户 ID
   */
  userId?: string;
}

/**
 * Account transaction item
 */
export interface AccountTransactionItem {
  /**
    * 钱包账户 ID
    */
  accountId?: string;
  /**
   * 钱包地址
   */
  address?: string;
  /**
   * 交易金额
   */
  amount?: string;
  /**
   * 钱包资产 ID
   */
  assetId?: string;
  /**
   * 银行支行
   */
  bankBranch?: string;
  /**
   * 银行 ID
   */
  bankId?: string;
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 银行代码
   */
  bic?: string;
  /**
   * 区块高度
   */
  blockHigh?: number;
  /**
   * 链 ID
   */
  chainId?: string;
  /**
   * 创建时间
   */
  createTime?: number;
  /**
   * 币种类型
   */
  currency?: string;
  /**
   * 币种精度
   */
  decimals?: number;
  /**
   * 手续费
   */
  fee?: string;
  /**
   * 法币金额
   */
  fiatAmount?: string;
  /**
   * 法币币种
   */
  fiatCurrency?: string;
  /**
   * 账户持有人姓名
   */
  holderName?: string;
  /**
   * 银行账户
   */
  iban?: string;
  /**
   * 主键 ID
   */
  id?: string;
  /**
   * 备注
   */
  remark?: string;
  /**
   * 审查人
   */
  reviewedBy?: string;
  /**
   * 审查时间
   */
  reviewTime?: number;
  /**
   * 状态（0：待审核，1：审核成功，2：审核驳回，3：交易成功，4：交易失败）
   */
  status?: number;
  /**
   * 第三方状态（0：待审核，1：审核成功，2：审核驳回，3：交易成功，4：交易失败）
   */
  thirdPartyStatus?: number;
  /**
   * 交易时间
   */
  timestamp?: number;
  /**
   * 转账目标地址
   */
  toAddress?: string;
  /**
   * 外部业务流水号
   */
  tradeId?: string;
  /**
   * 交易类型（1：法币入金，2：法币出金，3：转账，4：提款）
   */
  tradeType?: number;
  /**
   * 区块链交易 hash
   */
  txId?: string;
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
 * Account transaction review params
 */
export interface AccountTransactionReviewParams {
  id: string; // 账户交易 ID
  status: number; // 账户交易状态
  tradeId: string; // 外部交易 ID
}

/**
 * Account transaction response
 */
export interface AccountTransactionResponse {
  list?: AccountTransactionItem[];
  _meta: {
    currentPage: number;
    perPage: number;
    totalCount: number;
    totalPages: number;
  };
}