import { useModel } from "@umijs/max";
import { Button, Card, Form, InputNumber, message, Alert } from "antd";
import { useEffect, useState } from "react";
import Dashboard from "../dashboard";
import { weiToEther } from "@/utils";
import { useWhitelistCheck } from "@/hooks/useWhitelistCheck";
import OperationRecordTable from "./components/OperationRecordTable";

export default function Burn() {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const {
    status,
    isSelf,
    changeNetWork,
    openConnectModal,
    readContractsData,
    handleRedeem,
    handleTransfer,
    address,
  } = useModel("account");

  const { isWhitelisted } = useWhitelistCheck();
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setDisabled(false))
      .catch(() => setDisabled(true));
  }, [form, values]);

  const onFinish = async (values: any) => {
    if (status !== "connected") {
      openConnectModal?.();
      return;
    }

    if (!isWhitelisted) {
      message.error("Your address is not whitelisted for burn operations");
      return;
    }


    // Get transaction hash from handleRedeem or use a placeholder
    await changeNetWork(9200);

    if (isWhitelisted) {
      setLoading(true);
      handleTransfer(values.amount, () => {
        setLoading(false);
        form.resetFields();
        setRefreshTrigger((prev) => prev + 1);
      }, () => setLoading(false));
    } else {
      handleRedeem(values.amount, () => {
        setLoading(false);
        form.resetFields();
      }, () => setLoading(false));
    }
  };

  return (
    <>
      <Dashboard />
      <Card className="w-full mt-6 md:w-[800px]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-label="Minus"
              className="lucide lucide-minus w-6 h-6 text-red-600"
            >
              <path d="M5 12h14"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Burn USAD Tokens
            </h3>
            <p className="text-sm text-gray-600">
              Permanently remove USAD tokens from circulation
            </p>
          </div>
        </div>

        {status === "connected" && !isWhitelisted && !isSelf && (
          <Alert
            message="Not Whitelisted"
            description="Your address is not whitelisted for burn operations. Please contact the administrator."
            type="error"
            showIcon
            className="mb-6"
          />
        )}

        <Form size="large" onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            rules={[
              { required: true, message: "Please input amount" },
              {
                validator: (_, value) => {
                  const maxBalance = readContractsData
                    ? Number(
                        weiToEther(readContractsData?.[2]?.result as string)
                      )
                    : 0;
                  if (value > maxBalance) {
                    return Promise.reject(
                      `Amount cannot exceed ${maxBalance} USAD`
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
            name="amount"
            label="Amount"
          >
            <InputNumber
              onKeyDown={(e) => {
                // 阻止科学计数法相关的按键
                if (
                  ![
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "0",
                    ".",
                    "Backspace",
                  ].includes(e.key)
                ) {
                  e.preventDefault();
                }
                // 防止重复输入小数点
                if (e.key === "." && e.currentTarget.value.includes(".")) {
                  e.preventDefault();
                }
              }}
              min={0}
              precision={4}
              className="w-full"
            />
          </Form.Item>
          <div className="flex items-center gap-2 mb-6 text-xs text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-info w-3 h-3"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
            <span>
              Available balance:{" "}
              {readContractsData &&
                weiToEther(readContractsData?.[2]?.result as string)}{" "}
              USAD
            </span>
          </div>
          <Form.Item label={null}>
            <Button
              disabled={disabled || (!isWhitelisted && !isSelf) || status !== "connected"}
              loading={loading}
              className="w-full"
              htmlType="submit"
              type="primary"
            >
              Burn
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Operation Records Table */}
      <Card className="w-full mt-6 md:w-[800px]">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Burn Operation Records
        </h3>
        <OperationRecordTable
          operatorAddress={address}
          operationType="burn"
          refreshTrigger={refreshTrigger}
        />
      </Card>
    </>
  );
}
