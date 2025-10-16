import { WarningOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';

const { Title } = Typography;

interface CreateBlackAddressProps {
  onSubmit: (values: { address: string; reason: string }) => void;
  onCancel: () => void;
}

export default function CreateBlackAddress({
  onSubmit,
  onCancel,
}: CreateBlackAddressProps) {
  const [form] = Form.useForm();

  const handleFinish = (values: { address: string; reason: string }) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Card style={{ marginBottom: 24 }}>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <WarningOutlined style={{ fontSize: 20, color: '#ff4d4f' }} />
          <Title level={4} style={{ margin: 0 }}>
            Add Blacklist Address
          </Title>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label="Blacklist Address"
                name="address"
                rules={[
                  { required: true, message: 'Please enter wallet address' },
                  {
                    pattern: /^0x[a-fA-F0-9]{40}$/,
                    message: 'Please enter a valid Ethereum address',
                  },
                  {
                    validator: (_, value) => {
                      if (
                        value &&
                        value.toLowerCase() ===
                          '0x0000000000000000000000000000000000000000'
                      ) {
                        return Promise.reject(
                          new Error('Zero address is not allowed'),
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  placeholder="Enter wallet address, separated by commas"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Reason"
                name="reason"
                rules={[{ required: true, message: 'Please select a reason' }]}
              >
                <Select
                  placeholder="Select reason"
                  size="large"
                  options={[
                    {
                      value: 'Suspicious wallet address',
                      label: 'Suspicious wallet address',
                    },
                    { value: 'Suspected fraud', label: 'Suspected fraud' },
                    { value: 'Confirmed scam', label: 'Confirmed scam' },
                    { value: 'Money laundering', label: 'Money laundering' },
                    { value: 'Phishing', label: 'Phishing' },
                    { value: 'Other', label: 'Other' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginBottom: 0 }}>
            <Space>
              <Button type="primary" htmlType="submit" size="large">
                Confirm
              </Button>
              <Button
                color="default"
                variant="filled"
                onClick={onCancel}
                size="large"
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Space>
    </Card>
  );
}
