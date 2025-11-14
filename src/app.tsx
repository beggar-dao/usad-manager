import { LinkOutlined } from '@ant-design/icons';
import type { RequestConfig } from '@umijs/max';
import { Link, useModel } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import '@ant-design/v5-patch-for-react-19';
import { Spin } from 'antd';
import CustomConnectButton from './components/CustomConnectButton';
import RainbowWallet from './components/RainbowWallet';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';

const isDev = process.env.NODE_ENV === 'development';

// ProLayout 支持的api https://procomponents.ant.design/components/layout

export function rootContainer(container: React.ReactNode) {
  return <RainbowWallet>{container}</RainbowWallet>;
}

// 定义用户信息类型
interface UserInfo {
  name?: string;
  avatar?: string;
  // 添加其他用户信息字段
  [key: string]: any;
}

// 定义初始状态类型
interface InitialState {
  currentUser?: UserInfo;
  settings?: typeof defaultSettings;
  [key: string]: any;
}

// 初始化用户状态
let userInfo: UserInfo = {};
if (typeof window !== 'undefined') {
  const userInfoStr = localStorage.getItem('userInfo');
  if (userInfoStr) {
    try {
      userInfo = JSON.parse(userInfoStr);
    } catch (e) {
      console.error('Failed to parse userInfo from localStorage', e);
    }
  }
}

export async function getInitialState(): Promise<InitialState> {
  return {
    currentUser: userInfo,
    settings: defaultSettings,
  };
}

export const layout: any = () => {
  const { initialState, loading } = useModel('@@initialState');
  
  const isContract = location.pathname.startsWith("/contract")

  return {
    actionsRender: () => [
      isContract ? (
        <CustomConnectButton />
      ) : null,
    ],
    avatarProps: isContract
      ? null
      : {
        title: <AvatarName />,
        render: (_: any, avatarChildren: any) => {
          return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
        },
      },
    onPageChange: () => { },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
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

    childrenRender: (children: React.ReactNode) => {
      return (
        <>
          <Spin spinning={loading} fullscreen />
          {children}
        </>
      );
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
  baseURL: 'https://api.admin-usad.vn.com',
  ...errorConfig,
};
