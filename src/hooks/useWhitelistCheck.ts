import { useEffect, useState } from 'react';
import { useModel } from '@umijs/max';
import { getBurnAddresses } from '@/services/burn';

export const useWhitelistCheck = () => {
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useModel('account');

  useEffect(() => {
    const checkWhitelist = async () => {
      if (!address) {
        setIsWhitelisted(false);
        setError(null);
        return;
      }

      setChecking(true);
      setError(null);

      try {
        const response = await getBurnAddresses();
        if (response?.data.list) {
          const isAllowed = response.data.list.some(
            (item) => item.address.toLowerCase() === address.toLowerCase()
          );
          setIsWhitelisted(isAllowed);
        } else {
          setIsWhitelisted(false);
          setError('Failed to fetch whitelist');
        }
      } catch (err) {
        console.error('Failed to check whitelist:', err);
        setIsWhitelisted(false);
        setError(err instanceof Error ? err.message : 'Failed to check whitelist');
      } finally {
        setChecking(false);
      }
    };

    checkWhitelist();
  }, [address]);

  return {
    isWhitelisted,
    checking,
    error,
    address,
  };
};
