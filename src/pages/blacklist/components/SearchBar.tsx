import { SearchOutlined } from '@ant-design/icons';
import { Card, Input } from 'antd';

interface SearchBarProps {
  searchText: string;
  onSearchChange: (value: string) => void;
}

export default function SearchBar({
  searchText,
  onSearchChange,
}: SearchBarProps) {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Input
        size="large"
        placeholder="Search wallet address or reason"
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={(e) => onSearchChange(e.target.value)}
        allowClear
      />
    </Card>
  );
}
