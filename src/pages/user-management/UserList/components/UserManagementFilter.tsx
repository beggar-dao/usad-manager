import { Button, ConfigProvider, DatePicker, Form, Input, Select } from 'antd';
import type dayjs from 'dayjs';
import type { FunctionComponent } from 'react';
import type { UserManagementParams } from '@/services/user-management';
import { KYCStatusOptions } from '../utils/user-management';

interface Props {
  onValuesChange?: (
    changedValues: { [key: string]: any },
    values: UserManagementParams,
  ) => void;
}

const UserManagementFilter: FunctionComponent<Props> = ({ onValuesChange }) => {
  const [form] = Form.useForm<
    UserManagementParams & { dateRange?: [dayjs.Dayjs, dayjs.Dayjs] }
  >();

  const handleValuesChange = (
    changedValues: { [key: string]: any },
    values: UserManagementParams & { dateRange?: [dayjs.Dayjs, dayjs.Dayjs] },
  ) => {
    const { dateRange, ...restProps } = values;

    if (onValuesChange) {
      onValuesChange(changedValues, {
        ...restProps,
        registryStartTime: dateRange ? dateRange[0].valueOf() : undefined,
        registryEndTime: dateRange
          ? dateRange[1].endOf('day').valueOf()
          : undefined,
      });
    }
  };

  const handleResetFilters = () => {
    form.resetFields();
  };

  return (
    <div className="mb-6 bg-white rounded-lg p-6">
      <ConfigProvider
        theme={{
          components: {
            Form: {
              itemMarginBottom: 16,
            },
            Input: {
              activeBg: '#F2F6FA',
              hoverBg: '#F2F6FA',
            },
            Select: {
              selectorBg: '#F2F6FA',
              optionActiveBg: 'rgba(32, 43, 75, 0.08)',
              optionSelectedBg: 'rgba(32, 43, 75, 0.16)',
            },
          },
        }}
      >
        <Form
          colon={false}
          form={form}
          variant="filled"
          className="register-form-layout"
          size="middle"
          onValuesChange={handleValuesChange}
          initialValues={{
            keyword: '',
            kycStatus: '',
            registryStartTime: undefined,
            registryEndTime: undefined,
          }}
        >
          <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-4 items-end">
            <Form.Item name="keyword" label="Search">
              <Input placeholder="Search by UID, Email or Name" />
            </Form.Item>

            <Form.Item name="kycStatus" label="KYC Status">
              <Select options={KYCStatusOptions} />
            </Form.Item>

            <Form.Item name="dateRange" label="Date Registered">
              <DatePicker.RangePicker className="w-full" />
            </Form.Item>

            <Form.Item>
              <Button
                type="default"
                onClick={handleResetFilters}
                className="h-10"
              >
                Reset Filters
              </Button>
            </Form.Item>
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default UserManagementFilter;
