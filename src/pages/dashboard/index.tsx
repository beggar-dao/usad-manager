import CopyComponent from "@/components/CopyComponent";
import { copyText } from "@/utils";
import { BlockOutlined, CopyOutlined } from "@ant-design/icons";
import { Card, message } from "antd";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="text-sm text-gray-600 font-medium">
              USAD Address
            </div>
            <div className="text-lg font-semibold text-gray-900 mt-1">
              0x12345678901234567890
            </div>
          </div>
          <CopyComponent text="0x12345678901234567890" />
        </div>
      </Card>
      <Card>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="text-sm text-gray-600 font-medium">
              Administrator Address
            </div>
            <div className="text-lg font-semibold text-gray-900 mt-1">
              0x12345678901234567890
            </div>
          </div>
          <CopyComponent text="0x12345678901234567890" />
        </div>
      </Card>
      <Card>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="text-sm text-gray-600 font-medium">Total USAD</div>
            <div className="text-lg font-semibold text-gray-900 mt-1">
              0x12345678901234567890
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="text-sm text-gray-600 font-medium">Balance</div>
            <div className="text-lg font-semibold text-gray-900 mt-1">
              0x12345678901234567890
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
