import { LinkOutlined } from "@ant-design/icons";
import type { RequestConfig } from "@umijs/max";
import { Link } from "@umijs/max";
import defaultSettings from "../config/defaultSettings";
import { errorConfig } from "./requestErrorConfig";
import "@ant-design/v5-patch-for-react-19";
import RainbowWallet from "./components/RainbowWallet";
import CustomConnectButton from "./components/CustomerConnect";

const isDev = process.env.NODE_ENV === "development";

// ProLayout 支持的api https://procomponents.ant.design/components/layout

export function rootContainer(container: React.ReactNode) {
  return <RainbowWallet>{container}</RainbowWallet>;
}
export const layout: any = () => {
  const initialState = {
    settings: {
      ...defaultSettings,
    },
  };
  return {
    actionsRender: () => [<CustomConnectButton />],
    onPageChange: () => {},
    bgLayoutImgList: [
      {
        src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr",
        left: 85,
        bottom: 100,
        height: "303px",
      },
      {
        src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr",
        bottom: -68,
        right: -45,
        height: "303px",
      },
      {
        src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr",
        bottom: 0,
        left: 0,
        width: "331px",
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,

    childrenRender: (children) => {
      return <>{children}</>;
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request: RequestConfig = {
  baseURL: "http://api.admin-beggar.vn-tools.net",
  ...errorConfig,
};
