import { useRequest } from '@umijs/max';
import { Button, ConfigProvider, Empty, message, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import CopyComponent from '@/components/CopyComponent';
import type { AccountTransactionItem } from '@/services/types/account';
import { getAccountTransactionList } from '@/services/wallet/account';

interface Props {
  userId: string;
}

export default function FiatDeposits({ userId }: Props) {
  const { data, loading } = useRequest(
    () =>
      getAccountTransactionList({
        userId,
        tradeType: 3,
        pageNumber: 1,
        pageSize: 20,
      }),
    {
      ready: !!userId,
      refreshDeps: [userId],
      onError: (error) => {
        message.error('Failed to fetch fiat deposits');
        console.error(error);
      },
    },
  );

  const fiatDeposits =
    (data?.list as AccountTransactionItem[] | undefined) ?? [];

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
      dataIndex: 'fiatCurrency',
      key: 'fiatCurrency',
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: 'Method',
      dataIndex: 'bankName',
      key: 'bankName',
      render: (text) => <span className="text-sm">{text}</span>,
    },
    {
      title: 'Account Number',
      dataIndex: 'bic',
      key: 'bic',
      render: (account: string) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{account}</span>
          <CopyComponent text={account} />
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'fiatAmount',
      key: 'fiatAmount',
      render: (amount: string, record) => (
        <span className="font-medium">
          {parseFloat(amount).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{' '}
          {record.fiatCurrency}
        </span>
      ),
    },
    {
      title: 'Fees',
      dataIndex: 'fee',
      key: 'fee',
      render: (fee: string) => (
        <span className="text-sm text-orange-600">{fee}</span>
      ),
    },
    {
      title: 'Transaction No.',
      dataIndex: 'tradeId',
      key: 'tradeId',
      render: (txNo: string) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{txNo}</span>
          <CopyComponent text={txNo} />
        </div>
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
        dataSource={fiatDeposits}
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
            <Empty description="This user has no fiat deposit history." />
          ),
        }}
      />
    </ConfigProvider>
  );
}
function handleApproveDeposit(record: AccountTransactionItem): void {
  throw new Error('Function not implemented.');
}
