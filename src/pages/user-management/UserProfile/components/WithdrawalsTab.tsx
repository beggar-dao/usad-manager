import { Segmented } from 'antd';
import { useState } from 'react';
import CryptoWithdrawals from './CryptoWithdrawals';
import FiatWithdrawals from './FiatWithdrawals';

interface Props {
  userId: string;
}

type WithdrawalType = 'crypto' | 'fiat';

export default function WithdrawalsTab({ userId }: Props) {
  const [activeTab, setActiveTab] = useState<WithdrawalType>('crypto');

  const items = [
    {
      value: 'crypto',
      label: 'Transfers',
    },
    {
      value: 'fiat',
      label: 'Fiat Withdrawals',
    },
  ];

  return (
    <>
      <Segmented
        options={items}
        value={activeTab}
        onChange={(value) => setActiveTab(value as WithdrawalType)}
      />
      <div className="mt-6">
        {activeTab === 'crypto' ? (
          <CryptoWithdrawals userId={userId} />
        ) : (
          <FiatWithdrawals userId={userId} />
        )}
      </div>
    </>
  );
}
