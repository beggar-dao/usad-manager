/**
 * User Management utilities and constants
 */

import {
  EmailVerificationStatus,
  KYCStatus,
} from '@/services/types/user-management';

/**
 * KYC Status options for filter dropdown
 */
export const KYCStatusOptions = [
  { label: 'All', value: '' },
  { label: 'Draft', value: KYCStatus.Draft },
  { label: 'Submitted', value: KYCStatus.Submitted },
  { label: 'Verified', value: KYCStatus.Verified },
  { label: 'Rejected', value: KYCStatus.Rejected },
];

/**
 * Email Verification Status options for filter dropdown
 */
export const EmailVerificationOptions = [
  { label: 'All', value: '' },
  { label: 'Verified', value: EmailVerificationStatus.Verified },
  { label: 'Unverified', value: EmailVerificationStatus.Unverified },
];

/**
 * Get display text for KYC status
 */
export function getKYCStatusText(status: KYCStatus): string {
  switch (status) {
    case KYCStatus.Draft:
      return 'Draft';
    case KYCStatus.Submitted:
      return 'Submitted';
    case KYCStatus.Verified:
      return 'Verified';
    case KYCStatus.Rejected:
      return 'Rejected';
    default:
      return status;
  }
}

/**
 * Get CSS class for KYC status
 */
export function getKYCStatusClass(status: KYCStatus): string {
  switch (status) {
    case KYCStatus.Verified:
      return '#00C087'; // Green
    case KYCStatus.Rejected:
      return '#FF4D4F'; // Red
    case KYCStatus.Submitted:
      return '#FFA940'; // Orange
    default:
      return '#202B4B';
  }
}

/**
 * Get display text for email verification status
 */
export function getEmailVerificationText(
  status: EmailVerificationStatus,
): string {
  switch (status) {
    case EmailVerificationStatus.Verified:
      return 'Verified';
    case EmailVerificationStatus.Unverified:
      return 'Unverified';
    default:
      return status;
  }
}

/**
 * Get CSS class for email verification status
 */
export function getEmailVerificationClass(
  status: EmailVerificationStatus,
): string {
  switch (status) {
    case EmailVerificationStatus.Verified:
      return '#00C087'; // Green
    case EmailVerificationStatus.Unverified:
      return '#FF4D4F'; // Red
    default:
      return '#202B4B';
  }
}
