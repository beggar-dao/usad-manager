export interface PaymentBankListParams {
  /**
     * 币种
     */
  currency?: string;
  /**
   * 搜索词
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
   * 状态
   */
  status?: number;
  /**
   * 用户 ID
   */
  userId?: string;
}

/**
 * com.beggar.client.wallet.payment.dto.response.WalletPaymentBankResponse
 *
 * WalletPaymentBankResponse
 */
export interface WalletPaymentBankItem {
  /**
   * 银行支行
   */
  bankBranch?: string;
  /**
   * 银行名称
   */
  bankName?: string;
  /**
   * 银行代码
   */
  bic?: string;
  /**
   * 账单地址
   */
  billingAddress?: string;
  /**
   * 创建时间
   */
  createTime?: number;
  /**
   * 币种
   */
  currency?: string;
  /**
   * 验证失败原因
   */
  failReason?: string;
  /**
   * 账户持有人姓名
   */
  holderName?: string;
  /**
   * 银行账户
   */
  iban?: string;
  /**
   * 主键
   */
  id?: string;
  /**
   * 审查人
   */
  reviewedBy?: string;
  /**
   * 审查时间
   */
  reviewTime?: number;
  /**
   * 审查交易 ID
   */
  reviewTransactionId?: string;
  /**
   * 状态（0：未验证，1：等待验证，2：验证通过，3：验证失败）
   */
  status?: number;
  /**
   * 交易 ID
   */
  transactionId?: string;
  /**
   * 交易时间
   */
  transactionTime?: number;
  /**
   * 交易对方
   */
  transactionToAcct?: string;
  /**
   * 交易对方银行名称
   */
  transactionToBankName?: string;
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
 * 返回数据体
 * 
 */
export interface PaymentBankResponse {
  pages?: number;
  list?: WalletPaymentBankItem[];
  _meta: {
    currentPage: number;
    perPage: number;
    totalCount: number;
    totalPages: number;
  };
}