import { request } from "@umijs/max";
import { AccountTransactionParams, AccountTransactionReviewParams, AccountTransactionResponse } from "../types/account";

/**
 * Get account transaction list
 * @params AccountTransactionParams - Account transaction list params
 * @returns Promise<AccountTransactionResponse>
 */
export function getAccountTransactionList(params: AccountTransactionParams): Promise<AccountTransactionResponse> {
  return request<AccountTransactionResponse>(`/wallet/account/transaction`, {
    method: 'GET',
    params,
  });
}

/**
 * Approve account transaction
 * @params AccountTransactionReviewParams - Account transaction review params
 * @returns Promise<void>
 */
export function approveAccountTransaction(params: AccountTransactionReviewParams): Promise<void> {
  return request(`/wallet/account/transaction/review`, {
    method: 'POST',
    data: params,
  });
}