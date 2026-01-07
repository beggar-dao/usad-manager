import { request } from '@umijs/max';

/**
 * 获取允许Burn操作的地址列表
 */
export interface BurnAddressResponse {
  data: {
    list: { id: number; address: string }[];
  }
}

export const getBurnAddresses = () => {
  return request<BurnAddressResponse>('/contract/burn/address', {
    method: 'get',
  });
};

/**
 * Burn操作请求参数
 */
export interface BurnParams {
  /**
   * 操作者地址
   */
  operatorAddress: string;
  /**
   * Burn数量
   */
  amount: string;
  /**
   * 操作 Hash
   */
  hash: string;
}

export const burnTokens = (params: BurnParams) => {
  return request('/contract/burn', {
    method: 'post',
    data: params,
  });
};

/**
 * 操作记录查询参数
 */
export interface OperationRequestParams {
  /**
   * 操作者地址
   */
  operatorAddress?: string;
  /**
   * 当前页面索引
   */
  pageNumber?: number;
  /**
   * 页面数目大小
   */
  pageSize?: number;
  /**
   * 操作类型 (burn/mint/blacklist等)
   */
  behavior?: string;
}

/**
 * 操作记录项
 */
export interface OperationItem {
  /**
   * ID
   */
  id?: number;
  /**
   * 操作类型
   */
  behavior?: string;
  /**
   * 操作者地址
   */
  operatorAddress?: string;
  /**
   * 操作数量
   */
  value?: string;
  /**
   * 创建时间
   */
  createTime?: number;
  /**
   * 更新时间
   */
  updateTime?: number;
}

/**
 * 操作记录响应
 */
export interface OperationResponse {
  data: {
    list: OperationItem[];
    _meta: {
      currentPage: number;
      pageCount: number;
      perPage: number;
      totalCount: number;
    };
  }
}

export const getOperations = (params: OperationRequestParams) => {
  return request<OperationResponse>('/contract/operation', {
    method: 'get',
    params,
  });
};
