import { Alert, Collapse, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { getUserBusinessRealNameProfile } from '@/services/user-business-real-name';
import type { UserBusinessRealNameResponse } from '@/services/types/user-business-real-name';

interface Props {
  userId: string;
}

export default function CorporateDocuments({ userId }: Props) {
  const { data: businessData, loading, error } = useRequest<UserBusinessRealNameResponse>(
    () => getUserBusinessRealNameProfile(userId),
    {
      ready: !!userId,
    },
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load corporate documents. Please try again later."
        type="error"
        showIcon
        className="mb-8"
      />
    );
  }

  if (!businessData) {
    return (
      <Alert
        message="No Data"
        description="No corporate KYC data found for this user."
        type="info"
        showIcon
        className="mb-8"
      />
    );
  }

  // Note: UBO and Representative data would come from separate API endpoints
  // For now, we'll show a placeholder message
  const renderNoDataMessage = () => (
    <div className="bg-[#F5F7FA] p-6 rounded-lg text-center">
      <span className="text-[#8C8C8C]">No associated parties data available</span>
    </div>
  );

  return (
    <div className="mb-8">
      {/* Company Information Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">
          Company Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Company Name
            </label>
            <div className="text-base text-[#202B4B]">
              {businessData.companyName || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Registration No.
            </label>
            <div className="text-base text-[#202B4B]">
              {businessData.registrationNumber || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Legal Address
            </label>
            <div className="text-base text-[#202B4B]">
              {businessData.legalAddress || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">Tax ID</label>
            <div className="text-base text-[#202B4B]">
              {businessData.taxId || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Nationality
            </label>
            <div className="text-base text-[#202B4B]">
              {businessData.nationality || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Email
            </label>
            <div className="text-base text-[#202B4B]">
              {businessData.email || '-'}
            </div>
          </div>
        </div>
      </div>

      {/* Associated Parties Section */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">
          Associated Parties
        </h3>
        <Collapse
          bordered={false}
          defaultActiveKey={['ubos']}
          expandIconPosition="end"
          expandIcon={({ isActive }) => (
            <DownOutlined rotate={isActive ? 180 : 0} />
          )}
          className="bg-white border-none"
          items={[
            {
              key: 'ubos',
              label: (
                <span className="text-base font-medium text-[#202B4B]">
                  UBO's
                </span>
              ),
              children: renderNoDataMessage(),
            },
            {
              key: 'representatives',
              label: (
                <span className="text-base font-medium text-[#202B4B]">
                  Representatives
                </span>
              ),
              children: renderNoDataMessage(),
            },
          ]}
        />
      </div>

      {/* Industry Details Section */}
      <div className="mb-8 border-t pt-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">
          Industry Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <div className="md:col-span-2">
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Industry Description
            </label>
            <div className="text-base text-[#202B4B]">
              {businessData.industryDescription || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Planned Investment per Year
            </label>
            <div className="text-base text-[#202B4B]">
              {businessData.plannedInvestment || '-'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
