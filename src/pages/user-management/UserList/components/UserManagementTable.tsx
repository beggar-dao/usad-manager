import { history, useRequest } from '@umijs/max';
import { Button, ConfigProvider, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { type FunctionComponent, useCallback, useState } from 'react';
import type {
  KYCStatus,
  UserManagementResponse,
  UserResponseItem,
} from '@/services/types/user-management';
import {
  getUserList,
  type UserManagementParams,
} from '@/services/user-management';
import { getKYCStatusClass, getKYCStatusText } from '../utils/user-management';

interface Props {
  filterParams: UserManagementParams;
}

const UserManagementTable: FunctionComponent<Props> = ({ filterParams }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const { data, loading } = useRequest(
    () => getUserList({ ...filterParams, pageNumber, pageSize }),
    {
      refreshDeps: [pageNumber, pageSize, filterParams],
    },
  );

  const userList = (data as UserManagementResponse) || {
    list: [],
    current: 1,
    size: pageSize,
    total: 0,
    pages: 0,
  };

  const columns: ColumnsType<UserResponseItem> = [
    {
      title: 'Registration Date',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
      render: (_, { createTime }) => (
        <span>{dayjs(createTime).format('DD/MM/YYYY HH:mm:ss')}</span>
      ),
    },
    {
      title: 'UID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Full Name',
      dataIndex: 'firstname',
      key: 'firstname',
      width: 150,
      render: (_, { firstname, lastname }) => (
        <span>
          {firstname} {lastname}
        </span>
      ),
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
      width: 120,
    },
    {
      title: 'KYC',
      dataIndex: 'kycStatus',
      key: 'kycStatus',
      width: 150,
      render: (_, { kycStatus }) =>
        kycStatus !== null ? (
          <Tag color={getKYCStatusClass(kycStatus as KYCStatus)}>
            {getKYCStatusText(kycStatus as KYCStatus)}
          </Tag>
        ) : (
          '-'
        ),
    },
    {
      title: 'Operation',
      key: 'operation',
      width: 100,
      fixed: 'right',
      render: (_, record: UserResponseItem) => (
        <Button
          type="link"
          className="tw-text-[#63BCFF] px-0"
          onClick={() => handleViewUser(record.id)}
        >
          View
        </Button>
      ),
    },
  ];

  const handleViewUser = (userId: string) => {
    history.push(`/user-management/user-profile/${userId}`);
  };

  const handlePageChange = useCallback(
    (page: number, newPageSize?: number) => {
      setPageNumber(page);
      if (newPageSize && newPageSize !== pageSize) {
        setPageSize(newPageSize);
      }
    },
    [pageSize],
  );

  return (
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
          dataSource={userList.list}
          rowKey="id"
          loading={loading}
          size="middle"
          scroll={{ x: 1200 }}
          pagination={{
            size: 'default',
            current: pageNumber,
            pageSize: userList.size,
            total: userList.total,
            onChange: handlePageChange,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default UserManagementTable;
