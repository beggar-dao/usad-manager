import { Alert, Image, Spin } from 'antd';
import { useRequest } from '@umijs/max';
import dayjs from 'dayjs';
import { getUserRealNameProfile } from '@/services/user-real-name';
import type { UserRealNameResponse } from '@/services/types/user-real-name';

interface Props {
  userId: string;
}

// Certificate type mapping
const CERTIFICATE_TYPE_MAP: Record<number, string> = {
  0: 'Passport',
  1: 'Driving Licence',
  2: 'National ID',
};

// Professional status mapping
const PROFESSIONAL_STATUS_MAP: Record<number, string> = {
  0: 'Unemployed',
  1: 'Salaried',
  2: 'Self-employed',
  3: 'Retired',
  4: 'Student',
};

export default function IndividualDocuments({ userId }: Props) {
  const { data: realNameData, loading, error } = useRequest<UserRealNameResponse>(
    () => getUserRealNameProfile(userId),
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
        description="Failed to load individual documents. Please try again later."
        type="error"
        showIcon
        className="mb-8"
      />
    );
  }

  if (!realNameData) {
    return (
      <Alert
        message="No Data"
        description="No individual KYC data found for this user."
        type="info"
        showIcon
        className="mb-8"
      />
    );
  }

  return (
    <div className="mb-8">
      {/* Personal Info Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">
          Personal Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              First Name
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.firstname || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Last Name
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.lastname || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Date Of Birth (DOB)
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.birthday
                ? dayjs(realNameData.birthday).format('DD/MM/YYYY')
                : '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Country of Birth
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.birthCountry || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Nationality
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.nationality || '-'}
            </div>
          </div>
        </div>
      </div>

      {/* Address Info Section */}
      <div className="mb-8 border-t pt-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">
          Address Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Street
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.street || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              City
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.city || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Province
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.province || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Postcode
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.postcode || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Country
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.country || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Address Proof
            </label>
            <div className="mt-2">
              {realNameData.addressProof ? (
                <Image
                  src={`data:image/png;base64,${realNameData.addressProof}`}
                  alt="Address Proof"
                  width={120}
                  height={80}
                  className="rounded border border-gray-200"
                  placeholder={
                    <div className="w-[120px] h-[80px] bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-gray-400">Loading...</span>
                    </div>
                  }
                />
              ) : (
                <span className="text-[#8C8C8C]">No document uploaded</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Info Section */}
      <div className="mb-8 border-t pt-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">
          Financial Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Planned Annual Investment
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.plannedAnnualInvestment || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Estimated Total Wealth
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.estimatedTotalWealth || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Annual Income/Earnings
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.annualEarnings || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Source of Funds
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.sourceOfFunds || '-'}
            </div>
          </div>
        </div>
      </div>

      {/* Occupation Info Section */}
      <div className="mb-8 border-t pt-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">
          Occupation Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <div className="md:col-span-2">
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Occupation Information
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.occupationDescription || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Professional Status
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.professionalStatus !== undefined
                ? PROFESSIONAL_STATUS_MAP[realNameData.professionalStatus] || '-'
                : '-'}
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold text-[#202B4B] mb-6">Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Country of Issue
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.certificateCountry || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Document Type
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.certificateType !== undefined
                ? CERTIFICATE_TYPE_MAP[realNameData.certificateType] || '-'
                : '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Certificate Number
            </label>
            <div className="text-base text-[#202B4B]">
              {realNameData.certificateNumber || '-'}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Front Side
            </label>
            <div className="mt-2">
              {realNameData.firstPhoto ? (
                <Image
                  src={`data:image/png;base64,${realNameData.firstPhoto}`}
                  alt="Front Side"
                  width={150}
                  height={100}
                  className="rounded border border-gray-200"
                  placeholder={
                    <div className="w-[150px] h-[100px] bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-gray-400">Loading...</span>
                    </div>
                  }
                />
              ) : (
                <span className="text-[#8C8C8C]">No document uploaded</span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">
              Back Side
            </label>
            <div className="mt-2">
              {realNameData.secondPhoto ? (
                <Image
                  src={`data:image/png;base64,${realNameData.secondPhoto}`}
                  alt="Back Side"
                  width={150}
                  height={100}
                  className="rounded border border-gray-200"
                  placeholder={
                    <div className="w-[150px] h-[100px] bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-gray-400">Loading...</span>
                    </div>
                  }
                />
              ) : (
                <span className="text-[#8C8C8C]">No document uploaded</span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#8C8C8C] mb-2">Selfie</label>
            <div className="mt-2">
              {realNameData.personalPhoto ? (
                <Image
                  src={`data:image/png;base64,${realNameData.personalPhoto}`}
                  alt="Selfie"
                  width={150}
                  height={100}
                  className="rounded border border-gray-200"
                  placeholder={
                    <div className="w-[150px] h-[100px] bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-gray-400">Loading...</span>
                    </div>
                  }
                />
              ) : (
                <span className="text-[#8C8C8C]">No document uploaded</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
