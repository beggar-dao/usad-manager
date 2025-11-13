import { useRequest } from '@umijs/max';
import {
  Button,
  ConfigProvider,
  DatePicker,
  Empty,
  Form,
  Input,
  Modal,
  message,
  Select,
  Table,
  Tag,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState } from 'react';
import {
  DeviceType,
  type LoginHistoryItem,
  type LoginHistoryParams,
  type LoginHistoryResponse,
  LoginSource,
} from '@/services/types/user-profile';
import { getLoginHistory, terminateSession } from '@/services/user-profile';

const { RangePicker } = DatePicker;

interface Props {
  userId: string;
}

export default function LoginHistoryTab({ userId }: Props) {
  const [form] = Form.useForm();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [filterParams, setFilterParams] = useState<LoginHistoryParams>({
    userId,
    pageNumber,
    pageSize,
  });

  // Fetch login history
  const { data, loading, refresh } = useRequest<LoginHistoryResponse, []>(
    () => getLoginHistory(filterParams),
    {
      refreshDeps: [filterParams],
    },
  );

  const loginHistory = data || {
    list: [],
    _meta: { currentPage: 1, perPage: pageSize, totalCount: 0, totalPages: 0 },
  };

  // Terminate session mutation
  const { run: terminateSessionRun, loading: terminatingSession } = useRequest(
    (sessionId: string) => terminateSession({ sessionId, userId }),
    {
      manual: true,
      onSuccess: () => {
        message.success('Session terminated successfully');
        refresh();
      },
      onError: (error) => {
        message.error('Failed to terminate session');
        console.error(error);
      },
    },
  );

  const handleTerminateSession = (record: LoginHistoryItem) => {
    Modal.confirm({
      title: 'Terminate Session',
      content: `Are you sure you want to terminate this active session from ${record.loginIp}?`,
      okText: 'Terminate',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        if (record.sessionId) {
          terminateSessionRun(record.sessionId);
        }
      },
    });
  };

  const handleFilter = () => {
    const values = form.getFieldsValue();
    const params: LoginHistoryParams = {
      userId,
      pageNumber: 1,
      pageSize,
    };

    if (values.dateRange && values.dateRange.length === 2) {
      params.startTime = values.dateRange[0].valueOf();
      params.endTime = values.dateRange[1].valueOf();
    }

    if (values.loginIp) {
      params.loginIp = values.loginIp;
    }

    if (values.loginSource) {
      params.loginSource = values.loginSource;
    }

    if (values.deviceType) {
      params.deviceType = values.deviceType;
    }

    setFilterParams(params);
    setPageNumber(1);
  };

  const handleReset = () => {
    form.resetFields();
    setFilterParams({
      userId,
      pageNumber: 1,
      pageSize,
    });
    setPageNumber(1);
  };

  const handlePageChange = (page: number, newPageSize?: number) => {
    setPageNumber(page);
    if (newPageSize && newPageSize !== pageSize) {
      setPageSize(newPageSize);
    }
    setFilterParams({
      ...filterParams,
      pageNumber: page,
      pageSize: newPageSize || pageSize,
    });
  };

  const columns: ColumnsType<LoginHistoryItem> = [
    {
      title: 'Login Time',
      dataIndex: 'loginTime',
      key: 'loginTime',
      width: 180,
      render: (_, { loginTime }) => (
        <span>{dayjs(loginTime).format('YYYY/MM/DD HH:mm:ss')}</span>
      ),
    },
    {
      title: 'Login IP Address',
      dataIndex: 'loginIp',
      key: 'loginIp',
      width: 150,
    },
    {
      title: 'Logout Time',
      dataIndex: 'logoutTime',
      key: 'logoutTime',
      width: 180,
      render: (_, { logoutTime, isActive }) =>
        isActive ? (
          <Tag color="green">Active</Tag>
        ) : logoutTime ? (
          <span>{dayjs(logoutTime).format('YYYY/MM/DD HH:mm:ss')}</span>
        ) : (
          '-'
        ),
    },
    {
      title: 'Login Duration',
      dataIndex: 'loginDuration',
      key: 'loginDuration',
      width: 150,
      render: (_, { loginDuration, isActive }) => {
        if (isActive) {
          const duration = Math.floor((Date.now() - _.loginTime) / 1000 / 60);
          return `${duration} min`;
        }
        return loginDuration ? `${loginDuration} min` : '-';
      },
    },
    {
      title: 'Login Source',
      dataIndex: 'loginSource',
      key: 'loginSource',
      width: 120,
      render: (_, { loginSource }) => {
        const sourceMap = {
          [LoginSource.Web]: { text: 'Web', color: 'blue' },
          [LoginSource.MobileApp]: { text: 'Mobile App', color: 'green' },
          [LoginSource.API]: { text: 'API', color: 'orange' },
        };
        const source = sourceMap[loginSource] || {
          text: loginSource,
          color: 'default',
        };
        return <Tag color={source.color}>{source.text}</Tag>;
      },
    },
    {
      title: 'Device Type',
      dataIndex: 'deviceType',
      key: 'deviceType',
      width: 120,
      render: (_, { deviceType }) => {
        const deviceMap = {
          [DeviceType.Mac]: 'Mac',
          [DeviceType.Windows]: 'Windows',
          [DeviceType.Android]: 'Android',
          [DeviceType.iOS]: 'iOS',
          [DeviceType.Other]: 'Other',
        };
        return deviceMap[deviceType] || deviceType;
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      fixed: 'right',
      render: (_, record: LoginHistoryItem) =>
        record.isActive ? (
          <Button
            type="link"
            danger
            onClick={() => handleTerminateSession(record)}
            loading={terminatingSession}
          >
            Terminate
          </Button>
        ) : (
          '-'
        ),
    },
  ];

  return (
    <div>
      {/* Filter Section */}
      <div className="mb-6 bg-[#F5F7FA] p-4 rounded-lg">
        <Form form={form} layout="vertical">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Form.Item label="Date Range" name="dateRange" className="mb-0">
              <RangePicker
                className="w-full"
                format="YYYY/MM/DD"
                placeholder={['Start Date', 'End Date']}
              />
            </Form.Item>

            <Form.Item label="IP Address" name="loginIp" className="mb-0">
              <Input placeholder="Enter IP address" />
            </Form.Item>

            <Form.Item label="Login Source" name="loginSource" className="mb-0">
              <Select
                placeholder="Select source"
                allowClear
                options={[
                  { label: 'Web', value: LoginSource.Web },
                  { label: 'Mobile App', value: LoginSource.MobileApp },
                  { label: 'API', value: LoginSource.API },
                ]}
              />
            </Form.Item>

            <Form.Item label="Device Type" name="deviceType" className="mb-0">
              <Select
                placeholder="Select device"
                allowClear
                options={[
                  { label: 'Mac', value: DeviceType.Mac },
                  { label: 'Windows', value: DeviceType.Windows },
                  { label: 'Android', value: DeviceType.Android },
                  { label: 'iOS', value: DeviceType.iOS },
                  { label: 'Other', value: DeviceType.Other },
                ]}
              />
            </Form.Item>
          </div>

          <div className="flex gap-3 mt-4">
            <Button type="primary" onClick={handleFilter}>
              Apply Filters
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </Form>
      </div>

      {/* Table Section */}
      <div className="w-full">
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerColor: 'rgba(32, 43, 75, 0.85)',
                headerBg: 'rgba(32, 43, 75, 0.05)',
                headerSplitColor: 'transparent',
                borderColor: 'rgba(32, 43, 75, 0.1)',
              },
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={loginHistory.list}
            rowKey="id"
            loading={loading}
            size="middle"
            scroll={{ x: 1200 }}
            pagination={{
              size: 'default',
              current: pageNumber,
              pageSize: loginHistory._meta.perPage,
              total: loginHistory._meta.totalCount,
              onChange: handlePageChange,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} login records`,
              pageSizeOptions: ['10', '20', '50', '100'],
            }}
            locale={{
              emptyText: <Empty />,
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
}
