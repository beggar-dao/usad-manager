import {
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Collapse, Image, Input, Modal, message } from 'antd';
import { Country } from 'country-state-city';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import {
  userBusinessRealName,
  userBusinessRealNameAudit,
  userBusinessRealNameMember,
  userBusinessRealNameMemberAudit,
  userBusinessRealNameMemberAuditDetail,
} from '@/services/api';

export default function KycList() {
  const [open, setOpen] = useState(false);
  const [obj, setObj] = useState({});
  const actionRef = useRef(null); // 添加这一行
  const [remark, setRemark] = useState('');
  const [list, setList] = useState([]);
  const handleCancel = () => {
    setOpen(false);
    setObj({});
    setRemark('');
    actionRef.current?.reload();
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
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
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
            {_ === 0 || _ === 1 ? (
              <Button
                onClick={() => {
                  setOpen(true);
                  setObj(record);
                }}
                type="link"
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
                variant="text"
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
                variant="text"
              >
                Reject
              </Button>
            ) : null}
          </div>
        );
      },
    },
  ];
  const getuboList = () => {
    userBusinessRealNameMember({ realnessId: obj.id }).then((res) => {
      setList(res?.data?.list || []);
    });
  };

  useEffect(() => {
    if (obj.id) {
      getuboList();
    }
  }, [obj]);

  const handleUserRealNameAudit = async (status: number) => {
    if (status === 3 && !remark) {
      message.error('Please enter the reason');
      return;
    }
    await userBusinessRealNameAudit({
      status,
      id: obj.id,
      failReason: remark,
    });
    message.success('Successfully updated');
    handleCancel();
  };

  const Detail = ({ id }: any) => {
    const [item, setItem] = useState<any>({});
    const [remark1, setRemark1] = useState('');
    const handleUserRealNameAuditMember = async (
      status: number,
      id: string,
    ) => {
      if (status === 3 && !remark1) {
        message.error('Please enter the reason');
        return;
      }
      await userBusinessRealNameMemberAudit({
        failReason: remark1,
        status,
        id,
      });
      message.success('Successfully updated');
      getuboList();
      // handleCancel();
    };
    useEffect(() => {
      if (id) {
        userBusinessRealNameMemberAuditDetail({ id }).then((res) => {
          setItem(res.data);
        });
      }
    }, [id]);
    return (
      <>
        <ProDescriptions className="mt-4" column={3}>
          <ProDescriptions.Item label="Document Type">
            {item.certificateType === 0 ? 'Passport' : ''}
            {item.certificateType === 1 ? "Driver's license" : ''}
            {item.certificateType === 2 ? 'ID Card' : ''}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Front Side">
            {item.firstPhotoData ? (
              <Image
                style={{ height: '80px' }}
                src={`data:image/png;base64,${item.firstPhotoData}`}
              />
            ) : null}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Back Side">
            {item.secondPhotoData ? (
              <Image
                style={{ height: '80px' }}
                src={`data:image/png;base64,${item.secondPhotoData}`}
              />
            ) : null}
          </ProDescriptions.Item>
        </ProDescriptions>
        <ProDescriptions className="mt-4" column={3}>
          <ProDescriptions.Item label="LiveNess Check">
            {item.personalPhotoData ? (
              <Image
                style={{ height: '80px' }}
                src={`data:image/png;base64,${item.personalPhotoData}`}
              />
            ) : null}
          </ProDescriptions.Item>
        </ProDescriptions>
        {item.status === 1 ? (
          <ProDescriptions className="mt-4">
            <ProDescriptions.Item className="flex-1" label="Remark">
              <div className="flex w-full justify-between items-end gap-10 ">
                <Input.TextArea
                  onChange={(e) => setRemark1(e.target.value)}
                  value={remark1}
                  placeholder="Please Write a Remark"
                  rows={4}
                  className="flex-1"
                />

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => handleUserRealNameAuditMember(2, id)}
                    color="cyan"
                    variant="solid"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleUserRealNameAuditMember(3, id)}
                    color="danger"
                    variant="solid"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </ProDescriptions.Item>
          </ProDescriptions>
        ) : null}
      </>
    );
  };

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
        title="Corporate KYB"
        onCancel={handleCancel}
        footer={(_) => {
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
          <ProDescriptions
            className="mt-4"
            column={2}
            title="Company Information"
          >
            <ProDescriptions.Item label="Company Name">
              {obj.companyName}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Registration NO">
              {obj.registrationNumber}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Legal Address">
              {obj.legalAddress}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Tax ID">
              {obj.taxId}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="Nationality">
              {Country.getCountryByCode(obj.nationality || '')?.name}
            </ProDescriptions.Item>
          </ProDescriptions>
          <ProDescriptions
            className="mt-4"
            column={2}
            title="Associated Parties"
          >
            <Collapse
              className="w-full"
              accordion
              defaultActiveKey={['1']}
              items={[
                {
                  key: '1',
                  label: 'UBO’s',
                  children: (
                    <Collapse
                      defaultActiveKey={0}
                      accordion
                      items={list
                        .filter((item: any) => item.type === 0)
                        .map((item, index) => {
                          return {
                            key: index,
                            label: `UBO-${item.firstname} ${item.lastname}`,
                            children: (
                              <>
                                <ProDescriptions title="">
                                  <ProDescriptions.Item label="First Name">
                                    {item.firstname}
                                  </ProDescriptions.Item>
                                  <ProDescriptions.Item label="Last Name">
                                    {item.lastname}
                                  </ProDescriptions.Item>
                                  <ProDescriptions.Item label="Email">
                                    {item.email}
                                  </ProDescriptions.Item>
                                </ProDescriptions>
                                <Detail id={item.id} />
                              </>
                            ),
                          };
                        })}
                    />
                  ),
                },
                {
                  key: '2',
                  label: 'Representatives',
                  children: (
                    <Collapse
                      defaultActiveKey={0}
                      accordion
                      items={list
                        .filter((item: any) => item.type === 1)
                        .map((item, index) => {
                          return {
                            key: index,
                            label: `Representatives-${item.firstname} ${item.lastname}`,
                            children: (
                              <>
                                <ProDescriptions title="">
                                  <ProDescriptions.Item label="First Name">
                                    {item.firstname}
                                  </ProDescriptions.Item>
                                  <ProDescriptions.Item label="Last Name">
                                    {item.lastname}
                                  </ProDescriptions.Item>
                                  <ProDescriptions.Item label="Email">
                                    {item.email}
                                  </ProDescriptions.Item>
                                </ProDescriptions>
                                <Detail id={item.id} />
                              </>
                            ),
                          };
                        })}
                    />
                  ),
                },
              ]}
            />
          </ProDescriptions>
          <ProDescriptions className="mt-4" column={2} title="Industry Details">
            <ProDescriptions.Item span={2} label="Industry Description">
              {obj.industryDescription}
            </ProDescriptions.Item>
            <ProDescriptions.Item span={2} label="Planned Investment per Year">
              {obj.plannedInvestment}
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
        // dataSource={dataSource}
        columns={columns}
        params={{}}
        actionRef={actionRef}
        request={async (
          // 第一个参数 params 查询表单和 params 参数的结合
          // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
          params: { pageSize: number; current: number },
        ) => {
          // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
          // 如果需要转化参数可以在这里进行修改
          console.log('params', params);
          const res = await userBusinessRealName({
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
