import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import type { BlacklistItem } from '@/services/blacklist';
import { Button, Card, Tag, Table, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

interface BlacklistTableProps {
  data: BlacklistItem[];
  loading?: boolean;
  onDelete: (record: BlacklistItem) => void;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
}

export default function BlacklistTable({ 
  data, 
  loading, 
  onDelete,
  pagination 
}: BlacklistTableProps) {
  const handleDelete = (record: BlacklistItem) => {
    Modal.confirm({
      title: 'Confirm Delete',
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete the blacklist entry for address ${record.address}?`,
      okText: 'Delete',
      okType: 'danger',
      okButtonProps: {
        variant: 'filled'
      },
      cancelText: 'Cancel',
      onOk: () => {
        onDelete(record);
      },
    });
  };

  const columns: ColumnsType<BlacklistItem> = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '30%',
      render: (address: string) => (
        <span style={{ fontFamily: 'monospace' }}>{address}</span>
      ),
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      width: '30%',
      render: (reason: string) => (
        <Tag color="red">{reason}</Tag> 
      ),
    },
    {
      title: 'Created Time',
      dataIndex: 'createTime',
      key: 'createTime',
      width: '20%',
      render: (time: number) => time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: 'Operator',
      dataIndex: 'operatorAddress',
      key: 'operatorAddress',
      width: '15%',
      render: (address: string) => address,
    },
    {
      title: 'Action',
      key: 'action',
      width: '5%',
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => handleDelete(record)}
          disabled={record.isDeleted === 1}
        />
      ),
    },
  ];

  return (
    <Card title="Blacklist Records">
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={pagination ? {
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} records`,
          onChange: pagination.onChange,
        } : false}
      />
    </Card>
  );
}
