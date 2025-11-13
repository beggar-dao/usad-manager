import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Image, Input, Modal, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import CopyComponent from '@/components/CopyComponent';
import { bankAudit, transferAudit, transferList } from '@/services/api';
import { maskString } from '@/utils';

export default function KycList() {
  const [open, setOpen] = useState(false);
  const actionRef = useRef(null); // 添加这一行
  const [form] = Form.useForm();
  const [type, setType] = useState<'approve' | 'reject'>('approve');
  const [obj, setObj] = useState<any>({});
  const handleCancel = () => {
    setOpen(false);
    actionRef.current?.reload();
  };

  const columns = [
    {
      title: 'Search',
      dataIndex: 'search',
      key: 'keyword',
      hideInTable: true,
      search: true,
      fieldProps: {
        placeholder: 'Bank Name, Account Holder Name and Account Number',
      },
    },
    {
      title: 'UID',
      dataIndex: 'userId',
      key: 'userId',
      fixed: 'left',
    },
    {
      title: 'Withdrawal Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render(text: any, record) {
        return record.timestamp
          ? dayjs(record.timestamp).format('YYYY-MM-DD HH:mm:ss')
          : '-';
      },
    },

    {
      title: 'Currency',
      dataIndex: 'fiatCurrency',
      search: true,
      key: 'fiatCurrency',
      valueType: 'select',
      valueEnum: {
        USAD: { text: 'USAD' },
      },
      fieldProps: {
        defaultValue: 'USAD',
      },
    },
    {
      title: 'Method',
      dataIndex: 'Method',
      key: 'Method',
      render() {
        return 'Bank Withdrawal';
      },
    },
    {
      title: 'Acc.Holder Name',
      dataIndex: 'holderName',
      key: 'holderName',
    },
    {
      title: 'Account No.',
      dataIndex: 'iban',
      key: 'iban',
    },

    {
      title: 'Bank Name',
      dataIndex: 'bankName',
      key: 'bankName',
    },

    {
      title: 'Burn Amount(USAD)',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Fees',
      dataIndex: 'fee',
      key: 'fee',
    },

    {
      title: 'Withdraw Amount',
      dataIndex: 'fiatAmount',
      key: 'fiatAmount',
    },

    {
      title: 'Withdrawal Status',
      dataIndex: 'status',
      key: 'status',
      search: true,
      valueType: 'select',
      valueEnum: {
        0: {
          text: 'Pending Review',
        },
        1: {
          text: 'Review Successful',
        },
        2: {
          text: 'Review Rejected',
        },
        3: {
          text: 'Transaction Successful',
        },
        4: {
          text: 'Transaction Failed',
        },
      },
      render: (text, record) => {
        return (
          <div>
            {record.status === 0 ? 'Pending Review' : null}
            {record.status === 1 ? 'Review Successful' : null}
            {record.status === 2 ? 'Review Rejected' : null}
            {record.status === 3 ? 'Transaction Successful' : null}
            {record.status === 4 ? 'Transaction Failed' : null}
          </div>
        );
      },
    },
    {
      title: 'Admin ID/Time',
      dataIndex: 'reviewedBy',
      key: 'reviewedBy',
      render(_, record: any) {
        return (
          <div>
            {record.reviewedBy}
            {record.reviewedBy && record.reviewTime ? '/' : '-'}
            {record.reviewTime
              ? dayjs(record.reviewTime).format('YYYY-MM-DD HH:mm:ss')
              : ''}
          </div>
        );
      },
    },
    {
      title: 'Transaction No.',
      dataIndex: 'txId',
      key: 'txId',
      render(text: any, record: any) {
        if (!record.txId) {
          return '-';
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
      title: 'Action',
      key: 'status',
      fixed: 'right',
      width: 200,
      dataIndex: 'status',
      render: (_, record) => {
        if (record.status !== 0) {
          return '-';
        }

        if (record.status === 0) {
          return (
            <div className="flex cursor-pointer justify-center items-center gap-2">
              <Button
                onClick={() => {
                  setOpen(true);
                  setType('approve');
                  setObj(record);
                }}
                color="cyan"
                variant="solid"
              >
                Approve
              </Button>
              <Button
                onClick={() => {
                  setOpen(true);
                  setType('reject');
                  setObj(record);
                }}
                color="danger"
                variant="solid"
              >
                Reject
              </Button>
            </div>
          );
        }
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
    await transferAudit({
      id: obj.id,
      status: type === 'approve' ? 1 : 2,
      ...values,
    });
    handleCancel();
    message.success('Operation successful');
  };

  useEffect(() => {
    form.resetFields();
  }, [open]);

  return (
    <PageContainer
      header={{
        title: '',
        ghost: true,
      }}
      fixedHeader
    >
      <Modal
        open={open}
        width={488}
        centered
        title={`Confirm ${type === 'approve' ? 'Approve' : 'Reject'}`}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="max-h-[60vh] overflow-y-auto">
          {type === 'approve' ? (
            <Form className="mt-6" layout="vertical" size="large" form={form}>
              <Form.Item
                rules={[{ required: true, message: '' }]}
                name={`${type === 'approve' ? 'tradeId' : 'failReason'}`}
                label={
                  type === 'approve'
                    ? `Transaction/Reference Number`
                    : `Reject Reason`
                }
              >
                {type === 'approve' ? (
                  <Input
                    placeholder="Transaction ID provided by your bank"
                    type="text"
                  />
                ) : (
                  <Input.TextArea placeholder="Reject Reason" />
                )}
              </Form.Item>
            </Form>
          ) : null}

          <div className="flex items-center mt-[48px] justify-between">
            <div
              onClick={handlerComplete}
              className="text-white flex-1 text-center cursor-pointer font-bold rounded-lg bg-[#202B4B] leading-[48px]"
            >
              Confirm
            </div>
            <div
              onClick={handleCancel}
              className="border flex-1 ml-6 text-center cursor-pointer text-[#202B4B] font-bold border-[#202B4B1F] rounded-lg leading-[48px]"
            >
              Cancel
            </div>
          </div>
        </div>
      </Modal>
      <ProTable
        rowKey="id"
        bordered
        search={{
          labelWidth: 'auto',
        }}
        scroll={{ x: 1500 }}
        actionRef={actionRef}
        columns={columns}
        params={{ tradeType: 4 }}
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params: { pageSize: number; current: number },
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          console.log('params', params);
          const res = await transferList({
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
