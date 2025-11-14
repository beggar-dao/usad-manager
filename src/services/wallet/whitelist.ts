import { request } from "@umijs/max";
import { WhitelistAddressParams, WhitelistAddressResponse } from "../types/whitelist";

/**
 * Get whitelist addresses for a user
 * @param params - Whitelist address parameters
 * @returns Promise with whitelist addresses
 */
export function getWhitelistAddresses(params: WhitelistAddressParams): Promise<WhitelistAddressResponse> {
  return request(`/wallet/address/whitelist`, {
    method: 'GET',
    params,
  });
}

/**
 * Remove address from whitelist
 * @param id - Whitelist address ID
 * @returns Promise with operation result
 */
export function removeFromWhitelist(id: number): Promise<void> {
  return request(`/wallet/address/whitelist/${id}`, {
    method: 'DELETE',
  });
}

