import { useRequest } from '@umijs/max';
import { Button, Form, Input, message, Select } from 'antd';
import { Country } from 'country-state-city';
import { useState } from 'react';
import { useUserRoles } from '@/hooks/useUserRoles';
import {
  AccountStatus,
  TwoFactorStatus,
  type UserProfile,
} from '@/services/types/user-profile';
import { updateUserProfile } from '@/services/user-profile';
import { ChangePasswordModal } from './modals';

interface Props {
  userId: string;
  userProfile?: UserProfile;
  refresh?: () => Promise<unknown>;
}

export default function AccountInfoTab({
  userProfile,
  userId,
  refresh,
}: Props) {
  const [form] = Form.useForm();
  const [securityForm] = Form.useForm();
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingSecurity, setIsEditingSecurity] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [updateSecurityLoading, setUpdateSecurityLoading] = useState(false);

  // Get roles and role utilities
  const { roleOptions } = useUserRoles();

  // Get all countries
  const countries = Country.getAllCountries().map((country) => ({
    label: country.name,
    value: country.name,
  }));

  // Account Status Options
  const accountStatusOptions = [
    { label: 'Active', value: AccountStatus.Active },
    { label: 'Locked', value: AccountStatus.Locked },
    { label: 'Withdrawals Blocked', value: AccountStatus.WithdrawalsBlocked },
    { label: 'Deactivated', value: AccountStatus.Deactivated },
  ];

  // 2FA Options
  const twoFactorOptions = [
    { label: 'Enabled', value: TwoFactorStatus.Enabled },
    { label: 'Disabled', value: TwoFactorStatus.Disabled },
  ];

  // Update account info mutation
  const { run: updateAccount, loading: updateAccountLoading } = useRequest(
    (values) => updateUserProfile({ ...values, id: userId }),
    {
      manual: true,
      onSuccess: () => {
        message.success('Account information updated successfully');
        setIsEditingAccount(false);
        refresh?.();
      },
      onError: (error) => {
        message.error('Failed to update account information');
        console.error(error);
      },
    },
  );

  const handleEditAccount = () => {
    form.setFieldsValue({
      firstname: userProfile?.firstname,
      lastname: userProfile?.lastname,
      country: userProfile?.country,
      status: userProfile?.status,
      roleId: userProfile?.roleId,
      email: userProfile?.email,
    });
    setIsEditingAccount(true);
  };

  const handleCancelAccount = () => {
    form.resetFields();
    setIsEditingAccount(false);
  };

  const handleSaveAccount = async () => {
    try {
      const values = await form.validateFields();
      updateAccount(values);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleEditSecurity = () => {
    securityForm.setFieldsValue({
      is2FA: userProfile?.is2FA
        ? TwoFactorStatus.Enabled
        : TwoFactorStatus.Disabled,
    });
    setIsEditingSecurity(true);
  };

  const handleCancelSecurity = () => {
    securityForm.resetFields();
    setIsEditingSecurity(false);
  };

  const handleSaveSecurity = async () => {
    try {
      const values = await securityForm.validateFields();
      setUpdateSecurityLoading(true);
      await updateUserProfile({
        id: userId,
        is2FA: values.is2FA,
      });
      message.success('Security settings updated successfully');
      setIsEditingSecurity(false);
      refresh?.();
    } catch (error) {
      message.error('Failed to update security settings');
      console.error('Validation failed:', error);
    } finally {
      setUpdateSecurityLoading(false);
    }
  };

  return (
    <div className="mb-8">
      {/* Account Info Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#202B4B]">Account Info</h3>
          {!isEditingAccount && (
            <Button type="primary" onClick={handleEditAccount}>
              Edit
            </Button>
          )}
        </div>

        <Form form={form} layout="vertical" className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item label="First Name" name="firstname">
              {isEditingAccount ? (
                <Input placeholder="Enter first name" />
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  {userProfile?.firstname}
                </div>
              )}
            </Form.Item>

            <Form.Item label="Last Name" name="lastname">
              {isEditingAccount ? (
                <Input placeholder="Enter last name" />
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  {userProfile?.lastname}
                </div>
              )}
            </Form.Item>

            <Form.Item label="Country" name="country">
              {isEditingAccount ? (
                <Select
                  showSearch
                  placeholder="Select country"
                  options={countries}
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  {userProfile?.country || '-'}
                </div>
              )}
            </Form.Item>

            <Form.Item label="Account Status" name="status">
              {isEditingAccount ? (
                <Select
                  placeholder="Select account status"
                  options={accountStatusOptions}
                />
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  {accountStatusOptions.find(
                    (opt) => opt.value === userProfile?.status,
                  )?.label || 'Active'}
                </div>
              )}
            </Form.Item>

            <Form.Item
              label="Email Address"
              name="email"
              rules={[{ type: 'email', message: 'Please enter valid email' }]}
            >
              {isEditingAccount ? (
                <Input disabled placeholder="Enter email address" />
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  {userProfile?.email}
                </div>
              )}
            </Form.Item>

            <Form.Item label="User Role" name="roleId">
              {isEditingAccount ? (
                <Select placeholder="Select user role" options={roleOptions} />
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  {roleOptions.find(
                    (opt: { label: string; value: number }) =>
                      opt.value === userProfile?.roleId,
                  )?.label || '-'}
                </div>
              )}
            </Form.Item>
          </div>

          {isEditingAccount && (
            <div className="flex gap-3 mt-6">
              <Button onClick={handleCancelAccount}>Cancel</Button>
              <Button
                type="primary"
                onClick={handleSaveAccount}
                loading={updateAccountLoading}
              >
                Save Changes
              </Button>
            </div>
          )}
        </Form>
      </div>

      {/* Security Section */}
      <div className="border-t pt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#202B4B]">Security</h3>
          {!isEditingSecurity && (
            <Button type="primary" onClick={handleEditSecurity}>
              Edit
            </Button>
          )}
        </div>

        <Form form={securityForm} layout="vertical" className="max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item label="2 Factor Authentication" name="is2FA">
              {isEditingSecurity ? (
                <Select
                  placeholder="Select 2FA status"
                  options={twoFactorOptions}
                />
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  {userProfile?.is2FA ? 'Enabled' : 'Disabled'}
                </div>
              )}
            </Form.Item>

            <Form.Item label="Password">
              {isEditingSecurity ? (
                <Button onClick={() => setIsPasswordModalVisible(true)}>
                  Change Password
                </Button>
              ) : (
                <div className="text-base text-[#202B4B] py-1">
                  <Button onClick={() => setIsPasswordModalVisible(true)}>
                    Change Password
                  </Button>
                </div>
              )}
            </Form.Item>

            {/* TODO: <Form.Item label="Last Password Update">
              <div className="text-base text-[#8C8C8C] py-1">
                {userProfile.updateTime
                  ? dayjs(userProfile.updateTime).format(
                    'DD/MM/YYYY HH:mm:ss',
                  )
                  : 'Never updated'}
              </div>
            </Form.Item> */}
          </div>

          {isEditingSecurity && (
            <div className="flex gap-3 mt-6">
              <Button onClick={handleCancelSecurity}>Cancel</Button>
              <Button
                type="primary"
                onClick={handleSaveSecurity}
                loading={updateSecurityLoading}
              >
                Save Changes
              </Button>
            </div>
          )}
        </Form>
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        userId={userId}
        visible={isPasswordModalVisible}
        onClose={() => setIsPasswordModalVisible(false)}
      />
    </div>
  );
}
