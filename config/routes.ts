/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    name: 'User Management',
    icon: 'user',
    path: '/user-management',
    routes: [
      {
        path: '/user-management',
        redirect: '/user-management/user-list',
      },
      {
        name: 'User List',
        path: '/user-management/user-list',
        component: './user-management/UserList',
      },
      {
        name: 'User Profile',
        path: '/user-management/user-profile/:userId',
        component: './user-management/UserProfile',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'KYC/KYB',
    icon: 'table',
    path: '/list',
    routes: [
      {
        path: '/list',
        redirect: '/list/kyc',
      },
      {
        name: 'Individual KYC',
        path: '/list/kyc',
        component: './kyc-list',
      },
      {
        name: 'Corporate KYB',
        path: '/list/kyb',
        component: './kyb-list',
      },
    ],
  },
  {
    name: 'USAD Contract',
    icon: 'cluster',
    path: '/contract',
    routes: [
      {
        path: '/contract',
        redirect: '/contract/mint',
      },
      {
        name: 'Mint',
        path: '/contract/mint',
        component: './mint',
      },
      {
        name: 'Burn',
        path: '/contract/burn',
        component: './burn',
      },
      {
        name: 'Admin',
        path: '/contract/admin',
        component: './admin',
      },
    ],
  },
  {
    path: '/payment',
    name: 'Payments',
    icon: 'bank',
    component: './payment',
  },

  {
    name: 'Deposits',
    icon: 'cluster',
    path: '/deposits',
    routes: [
      {
        path: '/deposits',
        redirect: '/deposits/crypto',
      },
      {
        name: 'Crypto Deposits',
        path: '/deposits/crypto',
        component: './deposits/crypto',
      },

      {
        name: 'Fiat Deposits',
        path: '/deposits/fiat',
        component: './deposits/fiat',
      },
    ],
  },
  {
    name: 'Fiat Withdrawals',
    path: '/withdrawal',
    icon: 'creditCard',
    component: './deposits/withdrawal',
  },
  {
    name: 'Transfers',
    path: '/transfer',
    icon: 'dollar',
    component: './deposits/transfer',
  },
  {
    path: '/',
    redirect: '/user-management',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
