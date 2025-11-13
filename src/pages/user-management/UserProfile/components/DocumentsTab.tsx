import { Segmented } from 'antd';
import { useState } from 'react';
import IndividualDocuments from './IndividualDocuments';
import CorporateDocuments from './CorporateDocuments';

interface Props {
  userId: string;
}

// Main Documents Tab Component
export default function DocumentsTab({ userId }: Props) {
  const [activeSubTab, setActiveSubTab] = useState<string | number>(
    'individual',
  );

  return (
    <div>
      <div className="mb-6">
        <Segmented
          value={activeSubTab}
          onChange={setActiveSubTab}
          options={[
            { label: 'Individual', value: 'individual' },
            { label: 'Corporate', value: 'corporate' },
          ]}
        />
      </div>

      <div>
        {activeSubTab === 'individual' && (
          <IndividualDocuments userId={userId} />
        )}
        {activeSubTab === 'corporate' && <CorporateDocuments userId={userId} />}
      </div>
    </div>
  );
}
