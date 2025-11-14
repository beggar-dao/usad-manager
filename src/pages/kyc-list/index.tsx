import {
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Image, Input, Modal, message } from 'antd';
import { Country } from 'country-state-city';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { userRealName, userRealNameAudit } from '@/services/api';

export default function KycList() {
  const [open, setOpen] = useState(false);
  const [obj, setObj] = useState({});
  const actionRef = useRef(null); // 添加这一行
  const [remark, setRemark] = useState('');
  const [imgError, setImgError] = useState(false);

  const handleCancel = () => {
    setOpen(false);
    setObj({});
    setRemark('');
    actionRef.current?.reload();
  };
  const status = {
    2: {
      name: 'Accepted',
      color: '#6ECE82',
      bgColor: '#6ECE8233',
    },
    3: {
      name: 'Rejected',
      color: '#FF2121',
      bgColor: '#FF212133',
    },
    1: {
      name: 'Awating for approval',
      color: '#202B4B',
      bgColor: '#202B4B33',
    },
  };
  const handleUserRealNameAudit = async (status: number) => {
    await userRealNameAudit({
      status,
      id: obj.id,
      failReason: remark,
    });
    message.success('Successfully updated');
    handleCancel();
  };
  const columns = [
    {
      title: 'UID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Full Name',
      dataIndex: 'address',
      key: 'address',
      render(_, record) {
        return (
          <div>
            {record.firstname || ''}
            {record.lastname || ''}
          </div>
        );
      },
    },
    {
      title: 'Submit Time',
      dataIndex: 'createTime',
      key: 'createTime',
      render(_) {
        if (_ === '-') {
          return;
        }
        return <div>{dayjs(_).format('DD/MM/YYYY HH:mm:ss')}</div>;
      },
    },
    {
      title: 'Review Time / Admin ID',
      dataIndex: 'reviewTime',
      key: 'reviewTime',
      render(_) {
        if (_ === '-') {
          return;
        }
        return <div>{dayjs(_).format('DD/MM/YYYY HH:mm:ss')}</div>;
      },
    },

    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, record) => {
        return (
          <div className="flex cursor-pointer items-center gap-2">
            {_ === 1 ? (
              <Button
                onClick={() => {
                  setOpen(true);
                  setObj(record);
                }}
                type="primary"
              >
                View
              </Button>
            ) : null}
            {_ === 2 ? (
              <Button
                onClick={() => {
                  setOpen(true);
                  setObj(record);
                }}
                color="cyan"
                variant="solid"
              >
                Approve
              </Button>
            ) : null}
            {_ === 3 ? (
              <Button
                onClick={() => {
                  setOpen(true);
                  setObj(record);
                }}
                color="danger"
                variant="solid"
              >
                Reject
              </Button>
            ) : null}
          </div>
        );
      },
    },
  ];

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
        width={'50%'}
        centered
        title="Individual KYC"
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => {
          if (obj.status === 1) {
            return (
              <>
                <Button
                  onClick={() => handleUserRealNameAudit(2)}
                  color="cyan"
                  variant="solid"
                >
                  Approve
                </Button>
                <Button
                  onClick={() => handleUserRealNameAudit(3)}
                  color="danger"
                  variant="solid"
                >
                  Reject
                </Button>
                {/* <CancelBtn />
              <OkBtn /> */}
              </>
            );
          }
        }}
      >
        <div className="max-h-[60vh] overflow-y-auto">
          <ProDescriptions className="mt-4" column={2} title="">
            <ProDescriptions.Item label="UID">
              {obj.userId}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Registration Time">
              {dayjs(obj.createTime).format('DD/MM/YYYY HH:mm:ss')}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Email">
              {obj.email}
            </ProDescriptions.Item>
          </ProDescriptions>
          <ProDescriptions className="mt-4" column={2} title="Personal Info">
            <ProDescriptions.Item label="First Name">
              {obj.firstname}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Last Name">
              {obj.lastname}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Date of Birth (DOB)">
              {dayjs(obj.birthday).format('DD/MM/YYYY')}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Country of Birth">
              {Country.getCountryByCode(obj.birthCountry || '')?.name}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Nationality">
              {Country.getCountryByCode(obj.nationality || '')?.name}
            </ProDescriptions.Item>
          </ProDescriptions>

          <ProDescriptions className="mt-4" column={2} title="Address">
            <ProDescriptions.Item label="Street,Home Number">
              {obj.street}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Apartment/Unit(Optional)">
              未知字段
            </ProDescriptions.Item>
            <ProDescriptions.Item label="City">{obj.city}</ProDescriptions.Item>
            <ProDescriptions.Item label="Postal Code">
              {obj.postcode}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Country">
              {obj.country}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Address Proof">
              {obj.addressProof && !imgError ? (
                <Image
                  style={{ height: '80px' }}
                  src={`data:image/png;base64,${obj.addressProof}`}
                  onError={() => setImgError(true)}
                />
              ) : (
                <embed
                  type="application/pdf"
                  src={`data:application/pdf;base64,${obj.addressProof}`}
                  width="100%"
                  height={300}
                />
              )}
            </ProDescriptions.Item>
          </ProDescriptions>

          <ProDescriptions className="mt-4" column={2} title="Financial Info">
            <ProDescriptions.Item label="Planned Annual Investment">
              {obj.plannedAnnualInvestment}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Annual Income/Earnings">
              {obj.annualEarnings}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Estimated Total Wealth">
              {obj.estimatedTotalWealth}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Source of Funds">
              {obj.sourceOfFunds}
            </ProDescriptions.Item>
          </ProDescriptions>

          <ProDescriptions className="mt-4" column={2} title="Occupation Info">
            <ProDescriptions.Item span={2} label="Occupation Description">
              {obj.occupationDescription}
            </ProDescriptions.Item>
            <ProDescriptions.Item span={2} label="Professional Status">
              {obj.professionalStatus}
            </ProDescriptions.Item>
          </ProDescriptions>
          <ProDescriptions className="mt-4" column={2} title="Documents">
            <ProDescriptions.Item label="Country of Issue">
              {Country.getCountryByCode(obj.certificateCountry || '')?.name}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Document Type">
              {obj.certificateType === 0 ? 'Passport' : ''}
              {obj.certificateType === 1 ? "Driver's license" : ''}
              {obj.certificateType === 2 ? 'ID Card' : ''}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Front Side">
              <Image
                style={{ height: '80px' }}
                src={`data:image/png;base64,${obj.firstPhotoData}`}
              />
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Back Side">
              <Image
                style={{ height: '80px' }}
                src={`data:image/png;base64,${obj.secondPhotoData}`}
              />
            </ProDescriptions.Item>
            <ProDescriptions.Item label="LiveNess Check">
              <Image
                style={{ height: '80px' }}
                src={`data:image/png;base64,${obj.personalPhotoData}`}
              />
            </ProDescriptions.Item>
          </ProDescriptions>
          {obj.status === 1 ? (
            <ProDescriptions className="mt-4" column={2} title="Remark">
              <Input.TextArea
                onChange={(e) => setRemark(e.target.value)}
                value={remark}
                placeholder="Please Write a Remark"
                rows={4}
              />
            </ProDescriptions>
          ) : null}
        </div>
      </Modal>
      <ProTable
        rowKey="id"
        search={false}
        bordered
        actionRef={actionRef}
        // dataSource={dataSource}
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
          const res = await userRealName({
            pageNumber: params.current,
            pageSize: params.pageSize,
          });
          return {
            data: res?.data?.list || [],
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: true,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: res?.data?.totalCount || 0,
          };
        }}
      />
    </PageContainer>
  );
}
