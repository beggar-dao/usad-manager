import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  // arbitrum,
  mainnet,
  // avalanche,
  // base,
  // optimism,
  // polygon,
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'VN',
  projectId: 'eaa7d7408ab20b56e829528c5aaf8b42',
  chains: [
    {
      id: 9200,
      name: 'TOK',
      iconUrl: 'https://tokscan.io/favicon.ico',
      iconBackground: '#000',
      nativeCurrency: {
        decimals: 18,
        name: 'tok',
        symbol: 'TOK',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.tokchain.org'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://scan.tokchain.org/' },
      },
    },
    {
      id: 15042,
      name: 'TOK Dev',
      iconUrl: 'https://tokscan.io/favicon.ico',
      iconBackground: '#000',
      nativeCurrency: {
        decimals: 18,
        name: 'tok',
        symbol: 'TOK',
      },
      rpcUrls: {
        default: {
          http: ['https://devrpc.tokchain.org'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://devscan.tokchain.org/' },
      },
    },
    mainnet,
    // polygon,
    // optimism,
    // arbitrum,
    // bsc,
    // base,
    // avalanche,
    {
      id: 56,
      name: 'BNB Smart Chain',
      nativeCurrency: {
        decimals: 18,
        name: 'BNB',
        symbol: 'BNB',
      },
      rpcUrls: {
        default: {
          http: [
            'https://burned-clean-crater.bsc.quiknode.pro/5cacde470dbfb4087eab934b54e6b05fc59e1e92',
          ],
        },
      },
      blockExplorers: {
        default: {
          name: 'BscScan',
          url: 'https://bscscan.com',
          apiUrl: 'https://api.bscscan.com/api',
        },
      },
      contracts: {
        multicall3: {
          address: '0xca11bde05977b3631167028862be2a173976ca11',
          blockCreated: 15921452,
        },
      },
    },
  ],
});
