import { Empty, Spin, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { getOperations, type OperationItem } from '@/services/burn';

interface OperationRecordTableProps {
  operatorAddress?: string;
  operationType?: string;
  refreshTrigger?: any;
}

export default function OperationRecordTable({
  operatorAddress,
  operationType = 'burn',
  refreshTrigger,
}: OperationRecordTableProps) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<OperationItem[]>([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchOperations = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await getOperations({
        operatorAddress,
        pageNumber: page,
        pageSize: pagination.pageSize,
        behavior: operationType,
      });

      if (response) {
        setData(response.data.list || []);
        if (response.data._meta) {
          setPagination({
            current: response.data._meta.currentPage,
            pageSize: response.data._meta.perPage,
            total: response.data._meta.totalCount,
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch operations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperations();
  }, [operatorAddress, operationType, refreshTrigger]);

  const columns = [
    {
      title: 'Address',
      dataIndex: 'operatorAddress',
      key: 'operatorAddress',
      render: (text: string) => (
        <span className="font-mono text-sm">
          {text?.substring(0, 6)}...{text?.substring(text.length - 4)}
        </span>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (text: string) => <span>{text} USAD</span>,
    },
    {
      title: 'Behavior',
      dataIndex: 'behavior',
      key: 'behavior',
      render: (text: string) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-medium">
          {text}
        </span>
      ),
    },
    {
      title: 'Time',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (timestamp: number) =>
        timestamp ? dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
  ];

  if (!operatorAddress) {
    return <Empty description="Please connect wallet first" />;
  }

  return (
    <Spin spinning={loading}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id || Math.random()}
        pagination={{
          ...pagination,
          onChange: (page) => fetchOperations(page),
        }}
        size="small"
      />
    </Spin>
  );
}
