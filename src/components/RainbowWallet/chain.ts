const config = {
  development: {
    id: 15042,
    name: "TOK Dev",
    iconUrl: "https://tokscan.io/favicon.ico",
    iconBackground: "#000",
    nativeCurrency: {
      decimals: 18,
      name: "TOK Dev",
      symbol: "TOK",
    },
    rpcUrls: {
      default: {
        http: ["https://devrpc.tokchain.org"],
      },
    },
    blockExplorers: {
      default: { name: "Explorer", url: "https://devscan.tokchain.org/" },
    },
  },
  test: {
    id: 15042,
    name: "TOK Dev",
    iconUrl: "https://tokscan.io/favicon.ico",
    iconBackground: "#000",
    nativeCurrency: {
      decimals: 18,
      name: "tok",
      symbol: "TOK",
    },
    rpcUrls: {
      default: {
        http: ["https://devrpc.tokchain.org"],
      },
    },
    blockExplorers: {
      default: { name: "Explorer", url: "https://devscan.tokchain.org/" },
    },
  },
  production: {
    id: 9200,
    name: "TOK",
    iconUrl: "https://tokscan.io/favicon.ico",
    iconBackground: "#000",
    nativeCurrency: {
      decimals: 18,
      name: "tok",
      symbol: "TOK",
    },
    rpcUrls: {
      default: {
        http: ["https://rpc.tokchain.org"],
      },
    },
    blockExplorers: {
      default: { name: "Explorer", url: "https://tokscan.io/" },
    },
  },
};

export default config[process.env.UMI_ENV];
