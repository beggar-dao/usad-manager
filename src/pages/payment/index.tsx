import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Image, Input, Modal, message } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { bankAudit, bankList } from '@/services/api';

export default function Payment() {
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
      title: 'Bank Account Number',
      dataIndex: 'iban',
      key: 'iban',
    },
    {
      title: 'Account Holder Name',
      dataIndex: 'holderName',
      key: 'holderName',
      search: false,
    },
    {
      title: 'Bank Name',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: 'Swift Code',
      dataIndex: 'bic',
      key: 'bic',
    },
    {
      title: 'Branch',
      dataIndex: 'bankBranch',
      key: 'bankBranch',
    },

    {
      title: 'Currency',
      dataIndex: 'currency',
      search: true,
      key: 'currency',
      valueType: 'select',
      valueEnum: {
        USAD: { text: 'USAD' },
      },
      fieldProps: {
        defaultValue: 'USAD',
      },
    },
    {
      title: 'Billing Address',
      dataIndex: 'billingAddress',
      key: 'billingAddress',
    },
    {
      title: 'Transaction No',
      dataIndex: 'transactionId',
      key: 'transactionId',
    },

    {
      title: 'Deposit Amount',
      dataIndex: 'DepositAmount',
      key: 'DepositAmount',
      render: () => {
        return <div>2</div>;
      },
    },
    {
      title: 'Deposit Time',
      dataIndex: 'transactionTime',
      key: 'transactionTime',
      render(text: any, record) {
        return record.transactionTime
          ? dayjs(record.transactionTime).format('YYYY-MM-DD HH:mm:ss')
          : '-';
      },
    },
    {
      title: 'Deposit to Acct',
      dataIndex: 'transactionToAcct',
      key: 'transactionToAcct',
    },
    {
      title: 'Deposit Bank Name',
      dataIndex: 'transactionToBankName',
      key: 'transactionToBankName',
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
      title: 'Admin Transaction No',
      dataIndex: 'reviewTransactionId',
      key: 'reviewTransactionId',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      search: true,
      valueType: 'select',
      valueEnum: {
        0: {
          text: 'Unverified',
        },
        1: {
          text: 'Waiting for verification',
        },
        2: {
          text: 'Verified',
        },
        3: {
          text: 'Verification failed',
        },
      },
      render: (text, record) => {
        return (
          <div>
            {record.status === 0 ? 'Unverified' : null}
            {record.status === 1 ? 'Waiting for verification' : null}
            {record.status === 2 ? 'Verified' : null}
            {record.status === 3 ? 'Verification failed' : null}
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
        if (record.status === 2) {
          return '-';
        }
        if (record.status === 3) {
          return (
            <div className="leading-5">
              <span className="text-red-500">Fail Reason：</span>
              {record.failReason}
            </div>
          );
        }
        if (record.status === 0) {
          return '-';
        }
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
      status: type === 'approve' ? 2 : 3,
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
          <Form className="mt-6" layout="vertical" size="large" form={form}>
            <Form.Item
              rules={[{ required: true, message: '' }]}
              name={`${type === 'approve' ? 'transactionId' : 'failReason'}`}
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
        // dataSource={dataSource}
        scroll={{ x: 1500 }}
        actionRef={actionRef}
        columns={columns}
        params={{}}
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params: { pageSize: number; current: number },
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          console.log('params', params);
          const res = await bankList({
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
