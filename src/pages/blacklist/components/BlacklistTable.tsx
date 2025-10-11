import { DeleteOutlined } from '@ant-design/icons';
import type { BlacklistItem } from '@/services/blacklist';
import { Button, Card, Table } from 'antd';
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
      title: 'Contract Address',
      dataIndex: 'contractAddress',
      key: 'contractAddress',
      width: '30%',
      render: (address: string) => (
        <span style={{ fontFamily: 'monospace' }}>{address}</span>
      ),
    },
    {
      title: 'Created Time',
      dataIndex: 'createTime',
      key: 'createTime',
      width: '20%',
      render: (time: number) => time ? dayjs(time * 1000).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: 'Operator',
      dataIndex: 'operatorAddress',
      key: 'operatorAddress',
      width: '15%',
      render: (address: string) => address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '-',
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
          onClick={() => onDelete(record)}
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
