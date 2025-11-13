import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import {
  Button,
  ConfigProvider,
  Empty,
  Modal,
  message,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import CopyComponent from '@/components/CopyComponent';
import {
  getAccountAssetList,
  updateAccountAssetStatus,
} from '@/services/wallet/account-asset';
import { getChainName, getCurrencyName } from '@/utils/chain';

interface Props {
  userId: string;
}

interface Wallet {
  id: string;
  address: string;
  chainId: string;
  currency: string;
  balance: string;
  freezeBalance: string;
  status: number; // 1: Active, 2: Frozen
}

export default function WalletsTab({ userId }: Props) {
  const [loading, setLoading] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  const {
    data,
    loading: fetchLoading,
    refresh,
  } = useRequest(
    () =>
      getAccountAssetList({
        userId,
        pageNumber: 1,
        pageSize: 100,
      }),
    {
      ready: !!userId,
      refreshDeps: [userId],
      onError: (error) => {
        message.error('Failed to fetch wallets');
        console.error(error);
      },
    },
  );

  const wallets = (data?.list as Wallet[] | undefined) ?? [];

  const handleFreezeWallet = (wallet: Wallet) => {
    const isFrozen = wallet.status === 2;
    const action = isFrozen ? 'unfreeze' : 'freeze';
    const newStatus = isFrozen ? 1 : 2; // 1: Active, 2: Frozen

    modal.confirm({
      title: `${isFrozen ? 'Unfreeze' : 'Freeze'} Wallet`,
      icon: <ExclamationCircleOutlined />,
      content: isFrozen
        ? 'Are you sure you want to unfreeze this wallet? The user will be able to deposit, withdraw, and transfer funds from this wallet.'
        : 'Are you sure you want to freeze this wallet? The user will not be able to deposit, withdraw, or transfer funds from this wallet while frozen.',
      okText: isFrozen ? 'Unfreeze' : 'Freeze',
      okButtonProps: { danger: !isFrozen },
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          setLoading(true);
          await updateAccountAssetStatus({
            id: Number(wallet.id),
            status: newStatus,
          });

          // Refresh wallet list
          refresh();

          message.success(`Wallet ${action}d successfully`);
        } catch (error) {
          message.error(`Failed to ${action} wallet`);
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns: ColumnsType<Wallet> = [
    {
      title: 'Wallet Address',
      dataIndex: 'address',
      key: 'address',
      render: (address: string) => (
        <div className="flex items-center gap-2">
          <Tooltip title={address}>
            <span className="font-mono text-sm">
              {address.slice(0, 10)}...{address.slice(-8)}
            </span>
          </Tooltip>
          <CopyComponent text={address} />
        </div>
      ),
    },
    {
      title: 'Chain',
      dataIndex: 'chainId',
      key: 'chainId',
      render: (chainId: string) => (
        <Tag color="blue">{getChainName(Number(chainId))}</Tag>
      ),
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      render: (text) => (
        <span className="font-medium">{getCurrencyName(Number(text))}</span>
      ),
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      align: 'right',
      render: (balance: string, record) => (
        <span className="font-medium text-base">
          {parseFloat(balance).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 6,
          })}{' '}
          {getCurrencyName(Number(record.currency))}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <Button
          type="link"
          danger={record.status === 1}
          onClick={() => handleFreezeWallet(record)}
          loading={loading}
        >
          {record.status === 2 ? 'Unfreeze Wallet' : 'Freeze Wallet'}
        </Button>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
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
          dataSource={wallets}
          rowKey="id"
          size="middle"
          loading={fetchLoading}
          pagination={{
            current: data?._meta?.currentPage || 1,
            pageSize: data?._meta?.perPage || 10,
            total: data?._meta?.totalCount || 0,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} wallets`,
          }}
          locale={{
            emptyText: <Empty />,
          }}
        />
      </ConfigProvider>
    </>
  );
}
