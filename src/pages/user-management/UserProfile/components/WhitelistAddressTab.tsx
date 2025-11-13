import { DeleteOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Button, message, Popconfirm, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import CopyComponent from '@/components/CopyComponent';
import type { WhitelistAddress } from '@/services/types/whitelist';
import {
  getWhitelistAddresses,
  removeFromWhitelist,
} from '@/services/wallet/whitelist';

interface Props {
  userId: string;
}

export default function WhitelistAddressTab({ userId }: Props) {
  const {
    data,
    loading: loadingAddresses,
    run: refreshList,
  } = useRequest(() => getWhitelistAddresses({ userId }), {
    ready: !!userId,
    refreshDeps: [userId],
  });

  const handleRemoveAddress = async (id?: number) => {
    if (!id) {
      return;
    }

    try {
      await removeFromWhitelist(id);
      message.success('Address removed from whitelist');
      refreshList();
    } catch (error) {
      console.error('Failed to remove address:', error);
      message.error('Failed to remove address from whitelist');
    }
  };

  const columns: ColumnsType<WhitelistAddress> = [
    {
      title: 'Label',
      dataIndex: 'tag',
      key: 'tag',
      render: (tag) => tag || '--',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (address) => (
        <div className="flex items-center gap-2">
          <span className="font-mono">{address}</span>
          <CopyComponent text={address} />
        </div>
      ),
    },
    {
      title: 'Chain',
      dataIndex: 'chainType',
      key: 'chainType',
      render: (chainType) =>
        chainType ? <Tag color="blue">{chainType}</Tag> : '--',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      render: (currency) => currency || '--',
    },
    {
      title: 'Added On',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (time) => dayjs(time).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Delete whitelisted address"
          description="Are you sure you want to remove this address from the whitelist?"
          onConfirm={() => handleRemoveAddress(record.id)}
          okText="Yes, remove it"
          cancelText="No, keep it"
          okButtonProps={{ danger: true }}
        >
          <Button icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="whitelist-address-tab">
      <Table
        columns={columns}
        dataSource={data?.list || []}
        rowKey="id"
        loading={loadingAddresses}
        pagination={{
          pageSize: 10,
          total: data?._meta?.total,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} whitelisted addresses`,
        }}
        locale={{
          emptyText: 'No whitelisted addresses found',
        }}
      />
    </div>
  );
}
