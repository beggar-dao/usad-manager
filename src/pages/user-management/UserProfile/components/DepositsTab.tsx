import { Segmented } from 'antd';
import { useState } from 'react';
import CryptoDeposits from './CryptoDeposits';
import FiatDeposits from './FiatDeposits';

interface Props {
  userId: string;
}

type DepositType = 'crypto' | 'fiat';

export default function DepositsTab({ userId }: Props) {
  const [activeTab, setActiveTab] = useState<DepositType>('crypto');

  return (
    <>
      <Segmented
        options={[
          { label: 'Crypto Deposits', value: 'crypto' },
          { label: 'Fiat Deposits', value: 'fiat' },
        ]}
        value={activeTab}
        onChange={(value) => setActiveTab(value as DepositType)}
      />

      <div className="mt-6">
        {activeTab === 'crypto' ? (
          <CryptoDeposits userId={userId} />
        ) : (
          <FiatDeposits userId={userId} />
        )}
      </div>
    </>
  );
}
