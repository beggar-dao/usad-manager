import { request } from "@umijs/max";
import { PaymentBankListParams, PaymentBankResponse } from "../types/payment";

/**
 * Payment bank list
 * @params PaymentBankListParams - Payment bank list params
 * @returns Promise<PaymentBankResponse>
 */
export function getPaymentBankList(params: PaymentBankListParams): Promise<PaymentBankResponse> {
  return request<PaymentBankResponse>(`/wallet/payment/bank`, {
    method: 'GET',
    params,
  });
}

/**
 * Delete payment bank
 * @param bankId - Payment bank ID
 * @returns Promise<void>
 */
export function deletePaymentBank(bankId: string): Promise<void> {
  return request<void>(`/wallet/payment/bank/${bankId}`, {
    method: 'DELETE',
  });
}