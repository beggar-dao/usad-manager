import { PageContainer } from "@ant-design/pro-components";
import { history, useModel } from "@umijs/max";
import { Button, Card, Form, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";
import Dashboard from "../dashboard";
import { maskString, weiToEther } from "@/utils";
import CopyComponent from "@/components/CopyComponent";

export default function Mint() {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const {
    status,
    changeNetWork,
    openConnectModal,
    readContractsData,
    handleTransferOwnership,
  } = useModel("account");
  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setDisabled(false))
      .catch(() => setDisabled(true));
  }, [form, values]);
  const onFinish = async (values: any) => {
    if (status === "connected") {
      await changeNetWork(9200);
      console.log("Success:", values);
      handleTransferOwnership(values.amount);
      return;
    }
    openConnectModal?.();
  };

  return (
    <>
      <Dashboard />
      <Card className="w-full mt-6 md:w-[800px]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
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
              className="lucide lucide-shield w-6 h-6 text-blue-600"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Current Administrator
            </h3>
            <p className="text-sm text-gray-600">
              Active administrator account information
            </p>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
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
                  className="lucide lucide-user-cog w-5 h-5 text-white"
                >
                  <circle cx="18" cy="15" r="3"></circle>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M10 15H6a4 4 0 0 0-4 4v2"></path>
                  <path d="m21.7 16.4-.9-.3"></path>
                  <path d="m15.2 13.9-.9-.3"></path>
                  <path d="m16.6 18.7.3-.9"></path>
                  <path d="m19.1 12.2.3-.9"></path>
                  <path d="m19.6 18.7-.4-1"></path>
                  <path d="m16.8 12.3-.4-1"></path>
                  <path d="m14.3 16.6 1-.4"></path>
                  <path d="m20.7 13.8 1-.4"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">
                  Administrator Address
                </p>
                <p className="font-mono text-lg text-blue-900 font-semibold">
                  {maskString(
                    readContractsData && (readContractsData[0].result as string)
                  )}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Full access to all contract functions
                </p>
              </div>
            </div>
            <CopyComponent
              text={
                readContractsData && (readContractsData[0].result as string)
              }
            />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div
            onClick={() => {
              history.push("/mint");
            }}
            className="bg-gray-50 cursor-pointer rounded-lg p-3 text-center"
          >
            <div className="text-lg mb-1">🪙</div>
            <p className="text-xs text-gray-600 font-medium">Mint Tokens</p>
          </div>
          <div
            onClick={() => {
              history.push("/burn");
            }}
            className="bg-gray-50 cursor-pointer rounded-lg p-3 text-center"
          >
            <div className="text-lg mb-1">🔥</div>
            <p className="text-xs text-gray-600 font-medium">Burn Tokens</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-lg mb-1">🛡️</div>
            <p className="text-xs text-gray-600 font-medium">
              Manage Blacklist
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-lg mb-1">⏸️</div>
            <p className="text-xs text-gray-600 font-medium">Pause Transfers</p>
          </div>
        </div>
      </Card>
      <Card className="w-full mt-6 md:w-[800px]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
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
              className="lucide lucide-key w-6 h-6 text-purple-600"
            >
              <circle cx="7.5" cy="15.5" r="5.5"></circle>
              <path d="m21 2-9.6 9.6"></path>
              <path d="m15.5 7.5 3 3L22 7l-3-3"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Transfer Administrator Rights
            </h3>
            <p className="text-sm text-gray-600">
              Permanently transfer all administrative privileges
            </p>
          </div>
        </div>
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
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
              className="lucide lucide-alert-triangle w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
            <div>
              <p className="text-red-800 font-bold text-lg">
                ⚠️ CRITICAL WARNING
              </p>
              <div className="text-red-700 text-sm mt-2 space-y-1">
                <p>
                  • <strong>This action is IRREVERSIBLE</strong> - you cannot
                  undo this change
                </p>
                <p>
                  •{" "}
                  <strong>
                    You will IMMEDIATELY lose all admin privileges
                  </strong>
                </p>
                <p>
                  • <strong>The new admin must secure their private key</strong>{" "}
                  or all functions will be inaccessible
                </p>
                <p>
                  • <strong>Verify the new address multiple times</strong>{" "}
                  before confirming
                </p>
              </div>
            </div>
          </div>
        </div>
        <Form size="large" onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            rules={[{ required: true, message: "Please input amount" }]}
            name="amount"
            label="New Administrator Address"
          >
            <Input className="w-full" placeholder="0x..." />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              disabled={disabled}
              className="w-full"
              htmlType="submit"
              type="primary"
            >
              Transfer Administrator Rights
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}
