import CopyComponent from "@/components/CopyComponent";
import { copyText, maskString, weiToEther } from "@/utils";
import { BlockOutlined, CopyOutlined } from "@ant-design/icons";
import { Card, message } from "antd";
import abiData from "@/utils/abi";
import { useModel } from "@umijs/max";

export default function Dashboard() {
  const { readContractsData } = useModel("account");
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="text-sm text-gray-600 font-medium">
              USAD Address
            </div>
            <div className="text-lg font-semibold text-gray-900 mt-1">
              {maskString(abiData.address, 8)}
            </div>
          </div>
          <CopyComponent text={abiData.address} />
        </div>
      </Card>
      <Card>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="text-sm text-gray-600 font-medium">
              Administrator Address
            </div>
            <div className="text-lg font-semibold text-gray-900 mt-1">
              {maskString(
                readContractsData && (readContractsData[0].result as string),
                8
              )}
            </div>
          </div>
          <CopyComponent
            text={readContractsData && (readContractsData[0].result as string)}
          />
        </div>
      </Card>
      <Card>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="text-sm text-gray-600 font-medium">Total USAD</div>
            <div className="text-lg font-semibold text-gray-900 mt-1">
              {weiToEther(
                (readContractsData && readContractsData[1].result) || 0
              )}
            </div>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="text-sm text-gray-600 font-medium">Balance</div>
            <div className="text-lg font-semibold text-gray-900 mt-1">
              {weiToEther(
                (readContractsData && readContractsData[2].result) || 0
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
