# User Profile Page Structure

## Overview
The User Profile page has been organized with a clean, maintainable structure featuring 4 main tabs. Sub-navigation uses Ant Design's **Segmented** component for a modern, compact UI.

## Tab Structure

```
User Profile Page
│
├── Account Info (Main Tab)
│   ├── Account Info (Sub Tab)
│   │   ├── Account Info Section (editable fields)
│   │   └── Security Section (2FA, password)
│   │
│   └── Login History (Sub Tab)
│       ├── Filter Section
│       └── Login History Table
│
├── Documents (Main Tab)
│   ├── Individual (Sub Tab)
│   │   └── Individual KYC Documents
│   │
│   └── Corporate (Sub Tab)
│       └── Corporate KYB Documents
│
├── Payment Methods (Main Tab)
│   └── Payment Methods Table
│
└── Wallets (Main Tab)
    └── Wallets Table
```

## Component Architecture

### Main Components

**`index.tsx`** - Main UserProfile page
- Handles routing and user data fetching
- Displays user header information
- Manages main tab state
- Renders 4 main tabs

### Tab Components

**`AccountInfoMainTab.tsx`**
- Container for Account Info sub-navigation
- Uses Segmented component for Account Info and Login History switching

**`AccountInfoTab.tsx`**
- Account information editing (First Name, Last Name, Country, etc.)
- Security settings (2FA, Password)
- Edit mode with Save/Cancel functionality

**`LoginHistoryTab.tsx`**
- Login history table with filters
- Session management (terminate active sessions)
- Date range, IP, source, and device filters

**`DocumentsTab.tsx`**
- Container for Documents sub-navigation
- Uses Segmented component for Individual KYC and Corporate KYB switching
- Placeholder for document management

**`PaymentMethodsTab.tsx`**
- Payment methods table
- Bank accounts, cards, etc.
- Placeholder for payment method management

**`WalletsTab.tsx`**
- Crypto and fiat wallets table
- Balance display (total, available, frozen)
- Wallet status management

## File Organization

```
src/pages/user-management/UserProfile/
├── index.tsx                           # Main page component
├── README.md                           # This file
└── components/
    ├── index.ts                        # Component exports
    ├── AccountInfoMainTab.tsx          # Account Info container
    ├── AccountInfoTab.tsx              # Account details & security
    ├── LoginHistoryTab.tsx             # Login history table
    ├── DocumentsTab.tsx                # Documents container
    ├── PaymentMethodsTab.tsx           # Payment methods table
    └── WalletsTab.tsx                  # Wallets table
```

## Benefits of This Structure

1. **Separation of Concerns**
   - Each tab is a separate component
   - Easy to maintain and update independently

2. **Reusability**
   - Components can be reused in other parts of the application
   - Clean imports from single index file

3. **Scalability**
   - Easy to add new tabs or sub-tabs
   - Simple to extend functionality

4. **Readability**
   - Clear component hierarchy
   - Self-documenting structure
   - Easy for new developers to understand

5. **Testability**
   - Each component can be tested independently
   - Clear props interface for each component

6. **Modern UI with Segmented Component**
   - Compact, button-like sub-navigation
   - Better visual hierarchy (Main Tabs vs Sub-navigation)
   - Improved UX with clear active state
   - Less visual clutter compared to nested tabs

## Usage Examples

### Main Tabs
```tsx
import {
  AccountInfoMainTab,
  DocumentsTab,
  PaymentMethodsTab,
  WalletsTab,
} from './components';

// In your main component
<Tabs
  items={[
    {
      key: 'account-info',
      label: 'Account Info',
      children: <AccountInfoMainTab userProfile={userProfile} userId={userId} />,
    },
    {
      key: 'documents',
      label: 'Documents',
      children: <DocumentsTab userId={userId} />,
    },
    // ... more tabs
  ]}
/>
```

### Sub-Navigation with Segmented
```tsx
import { Segmented } from 'antd';
import { useState } from 'react';

function MyTabComponent() {
  const [activeSubTab, setActiveSubTab] = useState('option1');

  return (
    <div className="py-6">
      <div className="mb-6">
        <Segmented
          value={activeSubTab}
          onChange={setActiveSubTab}
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
          ]}
          size="large"
        />
      </div>

      <div>
        {activeSubTab === 'option1' && <Component1 />}
        {activeSubTab === 'option2' && <Component2 />}
      </div>
    </div>
  );
}
```

## Next Steps

1. **Documents Tab**: Implement Individual and Corporate document management
2. **Payment Methods Tab**: Connect to payment methods API
3. **Wallets Tab**: Connect to wallets API and implement balance management
4. Add loading states and error handling for each tab
5. Implement data refresh mechanisms
6. Add export functionality where needed
