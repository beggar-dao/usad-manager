import { PageContainer } from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Button, Form, InputNumber } from "antd";

export default function Mint() {
  const [form] = Form.useForm();
  const { status, changeNetWork } = useModel("account");
  const onFinish = async (values: any) => {
    if (status === "connected") {
      await changeNetWork(9200);
      console.log("Success:", values);
    }
  };
  return (
    <PageContainer title="Mint">
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Form.Item
          rules={[{ required: true, message: "Please input amount" }]}
          name="amount"
          label="Amount"
        >
          <InputNumber className="w-[500px]" />
        </Form.Item>
        <Form.Item label={null}>
          <Button htmlType="submit" type="primary">
            Mint
          </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  );
}
