import { ArrowLeftOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history, useParams, useRequest } from '@umijs/max';
import { Button, Skeleton, Tabs, Tag } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useUserRoles } from '@/hooks/useUserRoles';
import type { KYCStatus } from '@/services/types/user-management';
import { getUserProfile } from '@/services/user-profile';
import {
  getKYCStatusClass,
  getKYCStatusText,
} from '../UserList/utils/user-management';
import {
  AccountInfoMainTab,
  DepositsTab,
  DocumentsTab,
  PaymentMethodsTab,
  WalletsTab,
  WhitelistAddressTab,
  WithdrawalsTab,
} from './components';

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const [activeTab, setActiveTab] = useState('account-info');

  const {
    data: userProfile,
    loading,
    refresh,
  } = useRequest(() => getUserProfile(userId!), {
    ready: !!userId,
    formatResult: (response) => {
      console.log('response', response);
      return response.data;
    },
  });
  const { getRoleById } = useUserRoles();

  return (
    <PageContainer header={{ title: '' }}>
      {/* Back Button */}
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => history.push('/user-management/user-list')}
        className="mb-4 text-[#202B4B] hover:text-[#63BCFF]"
      >
        User Management
      </Button>

      {/* Header Card */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
        <Skeleton loading={loading}>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-[#202B4B]">
              {userProfile?.id || ''} Profile
            </h1>
          </div>

          {/* User Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-[#8C8C8C] mb-1">UID</div>
              <div className="text-base font-medium text-[#202B4B]">
                {userProfile?.id}
              </div>
            </div>

            <div>
              <div className="text-sm text-[#8C8C8C] mb-1">Full Name</div>
              <div className="text-base font-medium text-[#202B4B]">
                {userProfile?.firstname} {userProfile?.lastname}
              </div>
            </div>

            <div>
              <div className="text-sm text-[#8C8C8C] mb-1">Country</div>
              <div className="text-base font-medium text-[#202B4B]">
                {userProfile?.country || '-'}
              </div>
            </div>

            <div>
              <div className="text-sm text-[#8C8C8C] mb-1">Email</div>
              <div className="text-base font-medium text-[#202B4B]">
                {userProfile?.email || '-'}
              </div>
            </div>

            <div>
              <div className="text-sm text-[#8C8C8C] mb-1">Role</div>
              <div className="text-base font-medium text-[#202B4B]">
                {userProfile?.roleId
                  ? getRoleById(userProfile.roleId)?.name
                  : '-'}
              </div>
            </div>

            <div>
              <div className="text-sm text-[#8C8C8C] mb-1">Email Status</div>
              <Tag color="green">Verified</Tag>
            </div>

            <div>
              <div className="text-sm text-[#8C8C8C] mb-1">
                Joined Date & Time
              </div>
              <div className="text-base font-medium text-[#202B4B]">
                {userProfile
                  ? dayjs(userProfile.createTime).format('DD/MM/YYYY HH:mm:ss')
                  : '-'}
              </div>
            </div>

            <div>
              <div className="text-sm text-[#8C8C8C] mb-1">KYC Status</div>
              {userProfile?.kycStatus !== null &&
              userProfile?.kycStatus !== undefined ? (
                <Tag
                  color={getKYCStatusClass(userProfile.kycStatus as KYCStatus)}
                >
                  {getKYCStatusText(userProfile.kycStatus as KYCStatus)}
                </Tag>
              ) : (
                <span className="text-[#8C8C8C]">-</span>
              )}
            </div>

            <div>
              <div className="text-sm text-[#8C8C8C] mb-1">Last Login / IP</div>
              <div className="text-base font-medium text-[#202B4B]">{'-'}</div>
              {userProfile?.updateTime && (
                <div className="text-sm text-[#8C8C8C]">
                  {userProfile
                    ? dayjs(userProfile.updateTime).format(
                        'DD/MM/YYYY HH:mm:ss',
                      )
                    : '-'}
                </div>
              )}
            </div>
          </div>
        </Skeleton>
      </div>

      {/* Main Tabs Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="px-6"
          items={[
            {
              key: 'account-info',
              label: 'Account Info',
              children: (
                <AccountInfoMainTab
                  userProfile={userProfile}
                  userId={userId!}
                  refresh={refresh}
                />
              ),
            },
            {
              key: 'documents',
              label: 'Documents',
              children: <DocumentsTab userId={userId!} />,
            },
            {
              key: 'payment-methods',
              label: 'Payment Methods',
              children: <PaymentMethodsTab userId={userId!} />,
            },
            {
              key: 'wallets',
              label: 'Wallets',
              children: <WalletsTab userId={userId!} />,
            },
            {
              key: 'deposits',
              label: 'Deposits',
              children: <DepositsTab userId={userId!} />,
            },
            {
              key: 'withdrawals',
              label: 'Withdrawals',
              children: <WithdrawalsTab userId={userId!} />,
            },
            {
              key: 'whitelist',
              label: 'Whitelist Addresses',
              children: <WhitelistAddressTab userId={userId!} />,
            },
          ]}
        />
      </div>
    </PageContainer>
  );
}
