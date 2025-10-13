import { PlusOutlined } from '@ant-design/icons';
import { getBlacklist, type BlacklistItem, type BlacklistResponse } from '@/services/blacklist';
import { useModel, useRequest } from '@umijs/max';
import { Button, Flex, Typography } from 'antd';
import { useMemo, useState } from 'react';
import BlacklistTable from './components/BlacklistTable';
import CreateBlackAddress from './components/CreateBlackAddress';
import SearchBar from './components/SearchBar';
import StatisticsCards from './components/StatisticsCards';

const { Title, Text } = Typography;

export default function BlackList() {
  const [searchText, setSearchText] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Get account model for blockchain transactions
  const { 
    status, 
    handleAddBlacklist,
    handleRemoveBlacklist,
    changeNetWork,
    openConnectModal 
  } = useModel('account');

  // Fetch blacklist data
  const { data: blacklistResponse, loading, refresh } = useRequest(
    () => getBlacklist({
      pageNumber,
      pageSize,
    }),
    {
      refreshDeps: [pageNumber, pageSize],
    }
  );

  const data = (blacklistResponse as BlacklistResponse)?.list || [];
  const meta = (blacklistResponse as BlacklistResponse)?._meta;

  const filteredData = useMemo(
    () =>
      data.filter(
        (item: BlacklistItem) =>
          item.address?.toLowerCase().includes(searchText.toLowerCase())
      ),
    [searchText, data]
  );

  const handleAddClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  const handleCreateSubmit = async (values: { address: string; reason: string }) => {
    // Check if user is connected
    if (status !== 'connected') {
      openConnectModal?.();
      return;
    }

    // Ensure we're on the correct network
    await changeNetWork(9200);

    // Call the account model function to add to blacklist
    handleAddBlacklist(values, () => {
      setShowCreateForm(false);
      refresh();
    });
  };

  const handleCreateCancel = () => {
    setShowCreateForm(false);
  };

  const handleDelete = async (record: BlacklistItem) => {
    // Check if user is connected
    if (status !== 'connected') {
      openConnectModal?.();
      return;
    }

    // Ensure we're on the correct network
    await changeNetWork(9200);

    // Call the account model function to remove from blacklist
    handleRemoveBlacklist(record.address as string, () => {
      refresh();
    });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPageNumber(page);
    setPageSize(pageSize);
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
      <StatisticsCards totalCount={meta?.totalCount || 0}/>

      {/* Search and Action Bar */}
      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
      />

      {/* Table Section */}
      <BlacklistTable 
        data={filteredData} 
        loading={loading}
        onDelete={handleDelete}
        pagination={{
          current: pageNumber,
          pageSize: pageSize,
          total: meta?.totalCount || 0,
          onChange: handlePageChange,
        }}
      />
    </div>
  );
}
