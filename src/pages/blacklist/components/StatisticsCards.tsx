import { DeleteOutlined } from '@ant-design/icons';
import { Card, Space, Typography } from 'antd';

const { Text } = Typography;

interface StatisticsCardsProps {
  totalCount: number;
  pendingCount?: number;
  confirmedCount?: number;
}

export default function StatisticsCards({
  totalCount
}: StatisticsCardsProps) {
  const stats = [
    {
      icon: <DeleteOutlined style={{ fontSize: 20, color: '#ff4d4f' }} />,
      backgroundColor: '#fff1f0',
      borderColor: '#ffccc7',
      value: totalCount,
      label: 'Total Blacklisted',
    },
    // {
    //   icon: <span style={{ fontSize: 20 }}>⚠️</span>,
    //   backgroundColor: '#fffbe6',
    //   borderColor: '#ffe58f',
    //   value: pendingCount,
    //   label: 'Today\'s new',
    // },
    // {
    //   icon: <SearchOutlined style={{ fontSize: 20, color: '#1890ff' }} />,
    //   backgroundColor: '#e6f7ff',
    //   borderColor: '#91d5ff',
    //   value: confirmedCount,
    //   label: 'Search results',
    // },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16,
        marginBottom: 24,
      }}
    >
      {stats.map((stat, index) => (
        <Card key={`${index}`}>
          <Space direction="vertical" size={0}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: stat.backgroundColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1px solid ${stat.borderColor}`,
                }}
              >
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 600, color: '#000' }}>
                  {stat.value}
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {stat.label}
                </Text>
              </div>
            </div>
          </Space>
        </Card>
      ))}
    </div>
  );
}
