# Blacklist Management Page

## Structure

This page is organized into modular components for better maintainability and reusability.

### Components

#### 1. **StatisticsCards** (`components/StatisticsCards.tsx`)
Displays three statistics cards showing:
- Total blacklisted addresses
- Today's new additions
- Search results count

**Props:**
- `totalCount: number` - Total number of blacklisted addresses
- `pendingCount: number` - Number of today's new additions
- `confirmedCount: number` - Number of search results

#### 2. **SearchBar** (`components/SearchBar.tsx`)
Provides search functionality for filtering blacklist records.

**Props:**
- `searchText: string` - Current search text
- `onSearchChange: (value: string) => void` - Callback when search text changes

#### 3. **CreateBlackAddress** (`components/CreateBlackAddress.tsx`)
Form component for adding new addresses to the blacklist. Includes:
- Address input field with Ethereum address validation
- Reason dropdown with predefined options
- Confirm and Cancel buttons

**Props:**
- `onSubmit: (values: { address: string; reason: string }) => void` - Callback when form is submitted
- `onCancel: () => void` - Callback when cancel button is clicked

#### 4. **BlacklistTable** (`components/BlacklistTable.tsx`)
Displays the blacklist records in a table format with columns:
- Wallet address
- Reason (with color-coded tags)
- Added time
- Operator
- Action (delete button)

**Props:**
- `data: BlacklistRecord[]` - Array of blacklist records to display
- `onDelete: (record: BlacklistRecord) => void` - Callback when delete button is clicked

### Types

All shared types are defined in `types.ts`:

```typescript
interface BlacklistRecord {
  key: string;
  wallet: string;
  reason: string;
  addedTime: string;
  operator: string;
}
```

### Main Component (`index.tsx`)

The main component orchestrates all sub-components and manages:
- **Data fetching** using `useRequest` hook with `getBlacklist` API
- **Pagination state** (page number and page size)
- **Search state** for filtering results
- **Create form visibility state** (toggle on/off)
- **Data filtering** based on search text
- **Event handlers** for add, submit, cancel, delete, and pagination actions

**Features:**
- **API Integration**: Fetches blacklist data from backend API
- **Automatic refresh**: Data refreshes when pagination changes
- **Manual refresh**: Data refreshes after add/delete operations
- **Loading states**: Shows loading indicator during data fetch
- **Pagination**: Server-side pagination with page size control
- **Search filtering**: Client-side filtering by address
- **Toggle create form**: Form appears below header section when shown
- **Form auto-hide**: Form hides after successful submission or cancel

## Usage

The page is accessible at `/blacklist` route and is integrated with the application's navigation menu.

## API Integration

The page uses the following API services from `/src/services/blacklist.ts`:

- **`getBlacklist(params)`** - Fetches paginated blacklist data
- **`addBlacklist(params)`** - Adds new address to blacklist (to be implemented)
- **`deleteBlacklist(params)`** - Removes address from blacklist (to be implemented)

## Implementation Details

### Add to Blacklist Flow

1. **User Input**: User fills in address and reason in the form
2. **Wallet Check**: Verifies user is connected to wallet
3. **Network Switch**: Ensures user is on chain ID 9200
4. **Smart Contract Call**: Calls `addBlackList(_evilUser)` function via `handleAddBlacklist`
5. **Transaction Wait**: Waits for transaction confirmation
6. **Database Save**: Saves transaction details to backend via `addBlacklist` API
7. **UI Update**: Shows success message and refreshes data
8. **Form Close**: Automatically closes the form

### Remove from Blacklist Flow

1. **User Action**: User clicks delete button on a blacklist record
2. **Wallet Check**: Verifies user is connected to wallet
3. **Network Switch**: Ensures user is on chain ID 9200
4. **Smart Contract Call**: Calls `removeBlackList(_clearedUser)` function via `handleRemoveBlacklist`
5. **Transaction Wait**: Waits for transaction confirmation
6. **Database Update**: Updates transaction details in backend via `deleteBlacklist` API
7. **UI Update**: Shows success message and refreshes data

### Error Handling

- **Not Connected**: Opens connect modal
- **Wrong Network**: Switches to correct network automatically
- **Transaction Failed**: Shows error message from blockchain
- **Database Operation Failed**: Shows warning but transaction is still on-chain

## TODO

- [x] ~~Implement API integration for fetching blacklist data~~
- [x] ~~Add pagination state management~~
- [x] ~~Add loading states~~
- [x] ~~Implement add to blacklist functionality with blockchain transaction~~
- [x] ~~Implement delete from blacklist functionality with blockchain transaction~~
- [ ] Add confirmation dialog for delete action
- [ ] Add search by address
