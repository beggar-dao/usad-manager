import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, Helmet, history, useModel } from '@umijs/max';
import { useEffect } from 'react';
import { login } from '@/services/api';
import Settings from '../../../../config/defaultSettings';

const Login: React.FC = () => {
  const { setInitialState } = useModel('@@initialState');
  const handleSubmit = async (values: any) => {
    // 登录
    const res = await login({ ...values });
    setInitialState(res.data || {});
    localStorage.setItem('userInfo', JSON.stringify(res.data || {}));
    history.push('/');
  };

  useEffect(() => {
    localStorage.clear();
    setInitialState({});
  }, []);

  return (
    <>
      <Helmet>
        <title>{`Login - ${Settings.title}`}</title>
      </Helmet>
      <div className="h-[100vh] flex flex-col justify-center">
        <LoginFormPage
          backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
          title="USAD"
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
          submitter={{
            searchConfig: {
              submitText: 'Login',
            },
          }}
        >
          <>
            <div className="mt-8"></div>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined />,
              }}
              placeholder={'Please enter email'}
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: (
                    <FormattedMessage
                      id="pages.login.email.required"
                      defaultMessage="请输入邮箱!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              placeholder={'Please enter the password'}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="请输入密码！"
                    />
                  ),
                },
              ]}
            />
          </>
        </LoginFormPage>
      </div>
    </>
  );
};

export default Login;
