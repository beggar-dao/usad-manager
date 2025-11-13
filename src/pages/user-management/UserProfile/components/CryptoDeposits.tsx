import { LinkOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { ConfigProvider, Empty, message, Table, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import CopyComponent from '@/components/CopyComponent';
import type { AccountTransactionItem } from '@/services/types/account';
import { getAccountTransactionList } from '@/services/wallet/account';
import { getChainName, getCurrencyName } from '@/utils/chain';

interface Props {
  userId: string;
}

export default function CryptoDeposits({ userId }: Props) {
  const { data, loading } = useRequest(
    () =>
      getAccountTransactionList({
        userId,
        tradeType: 1,
        pageNumber: 1,
        pageSize: 20,
      }),
    {
      ready: !!userId,
      refreshDeps: [userId],
      onError: (error) => {
        message.error('Failed to fetch crypto deposits');
        console.error(error);
      },
    },
  );

  const cryptoDeposits =
    (data?.list as AccountTransactionItem[] | undefined) ?? [];

  const getBlockchainExplorerUrl = (txHash: string): string => {
    return `https://tokscan.io/tx/${txHash}`;
  };

  const columns: ColumnsType<AccountTransactionItem> = [
    {
      title: 'Deposit Time',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (time: number) => (
        <span className="text-sm">
          {dayjs(time).format('DD/MM/YYYY HH:mm:ss')}
        </span>
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
      title: 'Chain',
      dataIndex: 'chainId',
      key: 'chainId',
      render: (chainId: string) => (
        <Tag color="blue">{getChainName(Number(chainId))}</Tag>
      ),
    },
    {
      title: 'Wallet Address',
      dataIndex: 'address',
      key: 'address',
      render: (address: string) => (
        <div className="flex items-center gap-2">
          <Tooltip title={address}>
            <span className="font-mono text-sm">
              {address.slice(0, 8)}...{address.slice(-6)}
            </span>
          </Tooltip>
          <CopyComponent text={address} />
        </div>
      ),
    },
    {
      title: 'Transaction Hash',
      dataIndex: 'txId',
      key: 'txId',
      render: (hash: string) => (
        <div className="flex items-center gap-2">
          <Tooltip title={hash}>
            <span className="font-mono text-sm">
              {hash.slice(0, 8)}...{hash.slice(-6)}
            </span>
          </Tooltip>
          <CopyComponent text={hash} />
          <a
            href={getBlockchainExplorerUrl(hash)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            <LinkOutlined />
          </a>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (amount: string, record) => (
        <span className="font-medium">
          {parseFloat(amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
          })}{' '}
          {getCurrencyName(Number(record.currency))}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        const statusMap: Record<number, { text: string; color: string }> = {
          0: { text: 'Pending Review', color: 'orange' },
          1: { text: 'Approved', color: 'green' },
          2: { text: 'Rejected', color: 'red' },
          3: { text: 'Success', color: 'green' },
          4: { text: 'Failed', color: 'red' },
        };
        const statusInfo = statusMap[status] || {
          text: 'Unknown',
          color: 'default',
        };
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
      },
    },
  ];

  return (
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
        dataSource={cryptoDeposits}
        rowKey="id"
        size="middle"
        loading={loading}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} deposits`,
        }}
        locale={{
          emptyText: (
            <Empty description="This user has no crypto deposit history." />
          ),
        }}
      />
    </ConfigProvider>
  );
}
