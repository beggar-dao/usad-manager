import { useState } from 'react';
import type { UserProfile } from '@/services/types/user-profile';
import AccountInfoTab from './AccountInfoTab';
import LoginHistoryTab from './LoginHistoryTab';

interface Props {
  userId: string;
  userProfile?: UserProfile;
  refresh?: () => Promise<unknown>;
}

export default function AccountInfoMainTab({
  userProfile,
  userId,
  refresh,
}: Props) {
  const [activeSubTab, setActiveSubTab] = useState<string | number>(
    'account-details',
  );

  return (
    <div>
      {/* TODO: <div className="mb-6">
        <Segmented
          value={activeSubTab}
          onChange={setActiveSubTab}
          options={[
            { label: 'Account Info', value: 'account-details' },
            { label: 'Login History', value: 'login-history' },
          ]}
        />
      </div> */}

      <div>
        {activeSubTab === 'account-details' && (
          <AccountInfoTab
            userProfile={userProfile}
            userId={userId}
            refresh={refresh}
          />
        )}
        {activeSubTab === 'login-history' && (
          <LoginHistoryTab userId={userId} />
        )}
      </div>
    </div>
  );
}
