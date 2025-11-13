import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, Form, Image, Input, Modal, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { bankAudit, transactionList } from "@/services/api";
import { maskString } from "@/utils";
import CopyComponent from "@/components/CopyComponent";

export default function Crypto() {
  const [open, setOpen] = useState(false);
  const actionRef = useRef(null); // 添加这一行
  const [form] = Form.useForm();
  const handleCancel = () => {
    setOpen(false);
    actionRef.current?.reload();
  };

  const columns = [
    {
      title: "Search",
      dataIndex: "search",
      key: "keyword",
      hideInTable: true,
      search: true,
      fieldProps: {
        placeholder: "Search with Transaction hash or Uid or Address.",
      },
    },
    {
      title: "UID",
      dataIndex: "userId",
      key: "userId",
      fixed: "left",
    },
    {
      title: "Deposit Time",
      dataIndex: "timestamp",
      key: "timestamp",
      render(text: any, record) {
        return record.timestamp
          ? dayjs(record.timestamp).format("YYYY-MM-DD HH:mm:ss")
          : "-";
      },
    },
    {
      title: "Currency",
      dataIndex: "currency",
      search: true,
      key: "currency",
      valueType: "select",
      valueEnum: {
        USAD: { text: "USAD" },
      },
      render(text: any, record: any) {
        return (
          <div>
            {record.currency == 60 ? "ETH" : ""}
            {record.currency == 195 ? "TRX" : ""}
          </div>
        );
      },
    },
    {
      title: "Chain",
      dataIndex: "chainId",
      key: "chainId",
      search: true,
      valueType: "select",
      valueEnum: {
        60: { text: "ERC-20" },
        195: { text: "TRC-20" },
      },
      render(text: any, record: any) {
        return (
          <div>
            {record.chainId == 60 ? "ERC-20" : ""}
            {record.chainId == 195 ? "TRC-20" : ""}
          </div>
        );
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Transaction Hash",
      dataIndex: "txId",
      key: "txId",
      render(text: any, record: any) {
        if (!record.txId) {
          return "-";
        }
        return (
          <div className="flex items-center gap-2">
            {maskString(record.txId)}
            <CopyComponent text={record.txId} />
          </div>
        );
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render(text: any, record: any) {
        return (
          <div className="flex items-center gap-2">
            {maskString(record.address)}
            <CopyComponent text={record.address} />
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      search: true,
      valueType: "select",
      valueEnum: {
        "": {
          text: "All",
        },
        0: {
          text: "Pending",
        },
        3: {
          text: "Success",
        },
        4: {
          text: "Failed",
        },
      },

      render: (text, record) => {
        return (
          <>
            {record.status === 3 ? (
              <div className="text-green-600">Success</div>
            ) : null}
            {record.status === 0 ? (
              <div className="text-yellow-600">Pending</div>
            ) : null}
            {record.status === 4 ? (
              <div className="text-red-600">Failed</div>
            ) : null}
          </>
        );
      },
    },
  ].map((item) => {
    return {
      width: 180,
      search: false,
      ...item,
    };
  });

  const handlerComplete = async () => {
    const values = await form.validateFields();
    await bankAudit({
      id: obj.id,
      status: type === "approve" ? 2 : 3,
      ...values,
    });
    handleCancel();
    message.success("Operation successful");
  };

  useEffect(() => {
    form.resetFields();
  }, [open]);

  return (
    <PageContainer
      header={{
        title: "",
        ghost: true,
      }}
      fixedHeader
    >
      <ProTable
        rowKey="id"
        bordered
        // dataSource={dataSource}
        scroll={{ x: 1500 }}
        actionRef={actionRef}
        columns={columns}
        params={{ tradeType: 1 }}
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params: { pageSize: number; current: number }
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          console.log("params", params);
          const res = await transactionList({
            ...params,
            pageNumber: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: res?.data?.list || [],
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res?._meta?.totalCount || 0,
          };
        }}
      />
    </PageContainer>
  );
}
