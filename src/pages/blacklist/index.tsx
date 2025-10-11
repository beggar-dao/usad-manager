import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { useMemo, useState } from 'react';
import BlacklistTable from './components/BlacklistTable';
import CreateBlackAddress from './components/CreateBlackAddress';
import SearchBar from './components/SearchBar';
import StatisticsCards from './components/StatisticsCards';
import type { BlacklistRecord } from './types';

const { Title, Text } = Typography;

export default function BlackList() {
  const [searchText, setSearchText] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock data - replace with actual data from your API
  const data: BlacklistRecord[] = [
    {
      key: '1',
      wallet: 'KxfxfxEc...8xJ7zxfk',
      reason: 'Suspicious wallet address',
      addedTime: '2025-07-03',
      operator: 'Admin A',
    },
    {
      key: '2',
      wallet: 'KxQMFQS...17zHzfxz',
      reason: 'Suspected fraud',
      addedTime: '2025-07-08',
      operator: 'Admin B',
    },
    {
      key: '3',
      wallet: 'KxBcXx6o...2xDx4.1xF',
      reason: 'Confirmed scam',
      addedTime: '2025-07-18',
      operator: 'Admin A',
    },
  ];

  const filteredData = useMemo(
    () =>
      data.filter(
        (item) =>
          item.wallet.toLowerCase().includes(searchText.toLowerCase()) ||
          item.reason.toLowerCase().includes(searchText.toLowerCase()) ||
          item.operator.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText, data]
  );

  const handleAddClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleCreateSubmit = (values: { address: string; reason: string }) => {
    // TODO: Implement add to blacklist functionality
    console.log('Add to blacklist:', values);
    setShowCreateForm(false);
  };

  const handleCreateCancel = () => {
    setShowCreateForm(false);
  };

  const handleDelete = (record: BlacklistRecord) => {
    // TODO: Implement delete functionality
    console.log('Delete record:', record);
  };

  return (
    <div>
      {/* Header Section */}
      <Flex justify='space-between' align='center' style={{ marginBottom: 24 }}>
        <div>
          <Title level={2} style={{ marginBottom: 4 }}>
            Blacklist Management
          </Title>
          <Text type="secondary">Showing blacklist data from the last 30 days</Text>
        </div>
        <Button type="primary" size="large" icon={<PlusOutlined />} onClick={handleAddClick}>
          Add to List
        </Button>
      </Flex>

      {/* Create Black Address Form */}
      {showCreateForm && (
        <CreateBlackAddress
          onSubmit={handleCreateSubmit}
          onCancel={handleCreateCancel}
        />
      )}

      {/* Statistics Cards */}
      <StatisticsCards
        totalCount={data.length}
        pendingCount={0}
        confirmedCount={data.length}
      />

      {/* Search and Action Bar */}
      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
      />

      {/* Table Section */}
      <BlacklistTable data={filteredData} onDelete={handleDelete} />
    </div>
  );
}
