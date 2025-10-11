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
- Search state
- Create form visibility state (toggle on/off)
- Data filtering
- Event handlers for add, submit, cancel, and delete actions

**Features:**
- Toggle create form visibility by clicking "Add to List" button
- Form appears below the header section when shown
- Form hides when clicking "Add to List" again, Cancel button, or after successful submission

## Usage

The page is accessible at `/blacklist` route and is integrated with the application's navigation menu.

## TODO

- [ ] Implement API integration for fetching blacklist data
- [ ] Implement add to blacklist functionality
- [ ] Implement delete from blacklist functionality
- [ ] Add form/modal for adding new blacklist entries
- [ ] Add confirmation dialog for delete action
- [ ] Add pagination state management
- [ ] Add loading states
- [ ] Add error handling
