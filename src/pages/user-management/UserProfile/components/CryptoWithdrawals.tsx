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

export default function CryptoWithdrawals({ userId }: Props) {
  const { data, loading } = useRequest(
    async () =>
      getAccountTransactionList({
        userId,
        tradeType: 2, // 2: CHAIN_WITHDRAWAL
        pageNumber: 1,
        pageSize: 20,
      }),
    {
      ready: !!userId,
      refreshDeps: [userId],
      onError: (error) => {
        message.error('Failed to fetch crypto withdrawals');
        console.error(error);
      },
    },
  );

  const cryptoWithdrawals =
    (data?.list as AccountTransactionItem[] | undefined) ?? [];

  const getBlockchainExplorerUrl = (txHash: string): string => {
    return `https://tokscan.io/tx/${txHash}`;
  };

  const columns: ColumnsType<AccountTransactionItem> = [
    {
      title: 'Withdrawal Time',
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
      render: (currency: number) => (
        <span className="font-medium">{getCurrencyName(currency)}</span>
      ),
    },
    {
      title: 'Chain',
      dataIndex: 'chainId',
      key: 'chainId',
      render: (chainId: number) => (
        <Tag color="blue">{getChainName(chainId)}</Tag>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
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
      title: 'Network Fees',
      dataIndex: 'fee',
      key: 'fee',
      render: (fees: string, record) => (
        <span className="text-sm text-orange-600">
          {parseFloat(fees).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 8,
          })}{' '}
        </span>
      ),
    },
    {
      title: 'Net Amount',
      dataIndex: 'netAmount',
      key: 'netAmount',
      render: (netAmount: string, record) => {
        if (!netAmount) {
          return <span className="text-gray-400">--</span>;
        }

        return (
          <span className="font-medium">
            {parseFloat(netAmount).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 8,
            })}{' '}
            {getCurrencyName(Number(record.currency))}
          </span>
        );
      },
    },
    {
      title: 'Address',
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
      render: (hash: string, record) => {
        // Only show transaction hash if status is Approved (1) or Success (3)
        if (record.status !== 1 && record.status !== 3) {
          return <span className="text-gray-400">--</span>;
        }

        return (
          <div className="flex items-center gap-2">
            {hash ? (
              <Tooltip title={hash}>
                <span className="font-mono text-sm">
                  {hash.slice(0, 8)}...{hash.slice(-6)}
                </span>
              </Tooltip>
            ) : (
              <span className="text-gray-400">--</span>
            )}
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
        );
      },
    },
    {
      title: 'Withdrawal Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        const statusMap: Record<number, { text: string; color: string }> = {
          0: { text: 'Pending', color: 'orange' },
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
        dataSource={cryptoWithdrawals}
        rowKey="id"
        size="middle"
        loading={loading}
        pagination={{
          pageSize: 20,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} withdrawals`,
        }}
        locale={{
          emptyText: (
            <Empty description="This user has no crypto withdrawal history." />
          ),
        }}
      />
    </ConfigProvider>
  );
}
