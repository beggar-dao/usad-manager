import { request } from '@umijs/max';

/**
 * 
 * BlacklistRequestParams
 */
export interface BlacklistRequestParams {
  /**
   * 合约地址
   */
  contractAddress?: string;
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
}

/**
 * BlacklistItem
 */
export interface BlacklistItem {
  /**
   * 黑名单地址
   */
  address?: string;
  /**
   * 原因
   */
  reason: string;
  /**
   * 合约地址
   */
  contractAddress?: string;
  /**
   * 创建时间
   */
  createTime?: number;
  /**
   * 删除 Hash
   */
  deleteHash?: string;
  /**
   * 操作 Hash
   */
  hash?: string;
  /**
   * ID
   */
  id?: number;
  /**
   * 是否删除（0：否，1：是）
   */
  isDeleted?: number;
  /**
   * 操作者地址
   */
  operatorAddress?: string;
  /**
   * 更新时间
   */
  updateTime?: number;
}

/**
 * 返回数据体
 *
 * BlacklistResponse
 */
export interface BlacklistResponse {
  list: BlacklistItem[];
  _meta: {
    currentPage: number;
    pageCount: number;
    perPage: number;
    totalCount: number;
  };
}

export const getBlacklist = (params: BlacklistRequestParams) => {
  return request<BlacklistResponse>(
    '/contract/blacklist',
    {
      method: 'get',
      params,
    },
  );
};

export interface BlacklistParams {
  /**
   * 合约地址
   */
  contractAddress: string;
  /**
   * 操作者地址
   */
  operatorAddress?: string;
  /**
   * 黑名单地址
   */
  address: string;
  /**
   * 操作 Hash
   */
  hash: string;
  /**
   * 原因
   */
  reason?: string;
}

export const addBlacklist = (params: BlacklistParams) => {
  return request<BlacklistResponse>(
    '/contract/blacklist',
    {
      method: 'post',
      data: params,
    },
  );
};

export const deleteBlacklist = (params: BlacklistParams) => {
  return request<BlacklistResponse>(
    '/contract/blacklist',
    {
      method: 'delete',
      params,
    },
  );
};
