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
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import CopyComponent from '@/components/CopyComponent';
import type { WalletPaymentBankItem } from '@/services/types/payment';
import {
  deletePaymentBank,
  getPaymentBankList,
} from '@/services/wallet/payment';

interface Props {
  userId: string;
}

export default function PaymentMethodsTab({ userId }: Props) {
  const [modal, contextHolder] = Modal.useModal();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch payment methods from API
  const { data, loading, refresh } = useRequest(
    () => getPaymentBankList({ userId }),
    {
      refreshDeps: [userId],
    },
  );

  const paymentMethods = data?.list || [];

  const handleDelete = (record: WalletPaymentBankItem) => {
    modal.confirm({
      title: 'Confirm Delete Bank Account',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete this bank account? This action cannot be undone.`,
      okText: 'Delete',
      okButtonProps: { danger: true },
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          setDeletingId(record.id!);
          await deletePaymentBank(record.id!);

          message.success('Bank account deleted successfully');
          // Refresh the list
          refresh();
        } catch (error) {
          message.error('Failed to delete bank account');
          console.error(error);
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  const getStatusTag = (status?: number) => {
    switch (status) {
      case 0:
        return <Tag color="default">Unverified</Tag>;
      case 1:
        return <Tag color="processing">Pending Verification</Tag>;
      case 2:
        return <Tag color="success">Verified</Tag>;
      case 3:
        return <Tag color="error">Verification Failed</Tag>;
      default:
        return <Tag>Unknown</Tag>;
    }
  };

  const columns: ColumnsType<WalletPaymentBankItem> = [
    {
      title: 'Bank Account Number',
      dataIndex: 'iban',
      key: 'iban',
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{text || '--'}</span>
          {text && <CopyComponent text={text} />}
        </div>
      ),
    },
    {
      title: 'Acct. Holder Name',
      dataIndex: 'holderName',
      key: 'holderName',
      render: (text) => <span className="font-medium">{text || '--'}</span>,
    },
    {
      title: 'Bank Name',
      dataIndex: 'bankName',
      key: 'bankName',
      render: (text) => text || '--',
    },
    {
      title: 'Swift Code',
      dataIndex: 'bic',
      key: 'bic',
      render: (text: string) => (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm">{text || '--'}</span>
          {text && <CopyComponent text={text} />}
        </div>
      ),
    },
    {
      title: 'Branch',
      dataIndex: 'bankBranch',
      key: 'bankBranch',
      render: (text) => text || '--',
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      render: (text) => <span className="font-medium">{text || '--'}</span>,
    },
    {
      title: 'Billing Address',
      dataIndex: 'billingAddress',
      key: 'billingAddress',
      render: (text) => text || '--',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => getStatusTag(status),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'right',
      fixed: 'right',
      render: (_, record) => (
        <Button
          type="link"
          danger
          onClick={() => handleDelete(record)}
          loading={deletingId === record.id}
        >
          Delete
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
          dataSource={paymentMethods}
          rowKey="id"
          size="middle"
          loading={loading}
          scroll={{ x: 'max-content' }}
          pagination={{
            current: data?._meta?.currentPage || 1,
            pageSize: data?._meta?.perPage || 10,
            total: data?._meta?.totalCount || 0,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} payment methods`,
          }}
          locale={{
            emptyText: <Empty />,
          }}
        />
      </ConfigProvider>
    </>
  );
}
