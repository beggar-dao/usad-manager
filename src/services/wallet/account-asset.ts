import { request } from "@umijs/max";
import { AccountAssetParams, AccountAssetStatusParams, AccountAssetResponse } from "../types/account-asset";

/**
 * Get account asset list
 * @params AccountAssetParams - Account asset list params
 * @returns Promise<AccountAssetResponse>
 */
export function getAccountAssetList(params: AccountAssetParams): Promise<AccountAssetResponse> {
  return request<AccountAssetResponse>(`/wallet/account-asset`, {
    method: 'GET',
    params,
  });
}

/**
 * Update account asset status
 * @param params - Account asset status params
 * @returns Promise<void>
 */
export function updateAccountAssetStatus(params: AccountAssetStatusParams): Promise<void> {
  return request<void>(`/wallet/account-asset/status`, {
    method: 'PUT',
    data: params,
  });
}

