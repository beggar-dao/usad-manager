// Chain ID to Chain Name mapping
export const CHAIN_NAMES: Record<number, string> = {
  60: 'ERC-20',
  195: 'TRC-20',
  2510: 'BSC',
} as const;

// Chain ID to Currency mapping
export const CURRENCY_NAMES: Record<number, string> = {
  60: 'ETH',
  195: 'TRX',
  2510: 'BSC',
} as const;

/**
 * Get chain name by chain ID
 * @param chainId - Chain ID
 * @returns Chain name or empty string if not found
 */
export function getChainName(chainId: number): string {
  return CHAIN_NAMES[chainId] || '';
}

/**
 * Get currency name by chain ID
 * @param chainId - Chain ID
 * @returns Currency name or empty string if not found
 */
export function getCurrencyName(chainId: number): string {
  return CURRENCY_NAMES[chainId] || '';
}
