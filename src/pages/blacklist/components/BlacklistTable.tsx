import { DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { BlacklistRecord } from '../types';

interface BlacklistTableProps {
  data: BlacklistRecord[];
  onDelete: (record: BlacklistRecord) => void;
}

export default function BlacklistTable({ data, onDelete }: BlacklistTableProps) {
  const getReasonColor = (reason: string): string => {
    if (reason.toLowerCase().includes('fraud') || reason.toLowerCase().includes('scam')) {
      return 'red';
    }
    if (reason.toLowerCase().includes('suspicious')) {
      return 'orange';
    }
    if (reason.toLowerCase().includes('confirmed')) {
      return 'volcano';
    }
    return 'default';
  };

  const columns: ColumnsType<BlacklistRecord> = [
    {
      title: 'Wallet',
      dataIndex: 'wallet',
      key: 'wallet',
      width: '25%',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      width: '25%',
      render: (reason: string) => (
        <Tag color={getReasonColor(reason)}>{reason}</Tag>
      ),
    },
    {
      title: 'Added Time',
      dataIndex: 'addedTime',
      key: 'addedTime',
      width: '20%',
    },
    {
      title: 'Operator',
      dataIndex: 'operator',
      key: 'operator',
      width: '20%',
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          size="small"
          onClick={() => onDelete(record)}
        />
      ),
    },
  ];

  return (
    <Card title="Blacklist Records">
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} records`,
        }}
      />
    </Card>
  );
}
