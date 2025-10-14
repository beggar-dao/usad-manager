import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import { addBlacklist, deleteBlacklist } from '@/services/blacklist';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import {
  useAccount,
  useReadContracts,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi';
import abiData from '@/utils/abi';
import { etherToWei } from '@/utils/index';

export default function AccountModel() {
  const { setLoading } = useModel('global');
  const { address, status, chainId } = useAccount();

  const { data: readContractsData, refetch: readContractsRefetch } =
    useReadContracts({
      contracts: [
        {
          address: abiData.address,
          abi: abiData.abi,
          chainId: 9200,
          functionName: 'getOwner',
        },
        {
          address: abiData.address,
          abi: abiData.abi,
          chainId: 9200,
          functionName: '_totalSupply',
        },
        {
          address: abiData.address,
          abi: abiData.abi,
          chainId: 9200,
          functionName: 'balanceOf',
          args: [address as `0x${string}`],
        },
      ],
    });

  const isSelf = useMemo(() => {
    return (
      (readContractsData?.[0]?.result?.toString().toLowerCase()) ===
      (address?.toString().toLowerCase())
    );
  }, [readContractsData, address]);

  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const { writeContract } = useWriteContract();
  const [callbackFunc, setCallbackFunc] = useState(
    () => () => console.log('callback'),
  );
  const { switchChain } = useSwitchChain();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { status: transactionStatus } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (transactionStatus === 'success') {
      callbackFunc();
    } else if (transactionStatus === 'error') {
      setCallbackFunc(() => () => {});
      setHash(undefined);
      setLoading(false);
      message.error('Failed');
    }
  }, [transactionStatus]);
  
  const changeNetWork = async (chainId: number) => {
    await switchChain({ chainId });
  };

  const handleMint = (amount: string) => {
    if (!isSelf) {
      message.error('No permission');
      return;
    }

    setLoading(true);
    writeContract(
      {
        address: abiData.address,
        abi: abiData.abi,
        functionName: 'issue',
        args: [etherToWei(amount)],
      },
      {
        onSuccess: (data) => {
          setHash(data);
          setCallbackFunc(() => () => {
            message.success('Mint success');
            readContractsRefetch();
            setLoading(false);
            setCallbackFunc(() => () => {});
          });
        },
        onError: (_error) => {
          setLoading(false);
          message.error('Failed');
        },
      },
    );
  };

  const handleRedeem = (amount: string) => {
    if (!isSelf) {
      message.error('No permission');
      return;
    }

    setLoading(true);
    writeContract(
      {
        address: abiData.address,
        abi: abiData.abi,
        functionName: 'redeem',
        args: [etherToWei(amount)],
      },
      {
        onSuccess: (data) => {
          setHash(data);
          setCallbackFunc(() => () => {
            message.success('Burn success');
            readContractsRefetch();
            setLoading(false);
            setCallbackFunc(() => () => {});
          });
        },
        onError: (error) => {
          setLoading(false);
          message.error(error.message);
        },
      },
    );
  };

  const handleTransferOwnership = (address: string) => {
    if (!isSelf) {
      message.error('No permission');
      return;
    }
    setLoading(true);
    writeContract(
      {
        address: abiData.address,
        abi: abiData.abi,
        functionName: 'transferOwnership',
        args: [address],
      },
      {
        onSuccess: (data) => {
          setHash(data);
          setCallbackFunc(() => () => {
            message.success('Transfer ownership success');
            readContractsRefetch();
            setLoading(false);
            setCallbackFunc(() => () => {});
          });
        },
        onError: (error) => {
          setLoading(false);
          message.error(error.message);
        },
      },
    );
  };

  const handleAddBlacklist = (data: { address: string; reason: string }, onSuccess?: () => void) => {
    if (!isSelf) {
      message.error('No permission');
      return;
    }

    setLoading(true);
    writeContract(
      {
        address: abiData.address,
        abi: abiData.abi,
        functionName: 'addBlackList',
        args: [data.address as `0x${string}`],
      },
      {
        onSuccess: (txHash) => {
          setHash(txHash);
          setCallbackFunc(() => async () => {
            try {
              await addBlacklist({
                contractAddress: abiData.address,
                operatorAddress: address as string,
                address: data.address,
                hash: txHash,
                reason: data.reason,
              });
              message.success('Successfully added to blacklist');
              onSuccess?.();
            } catch (error) {
              console.error('Failed to save to database:', error);
              message.error('Transaction succeeded but failed to save to database');
            } finally {
              setLoading(false);
              setCallbackFunc(() => () => {});
            }
          });
        },
        onError: (error) => {
          setLoading(false);
          message.error(error.message || 'Failed to add to blacklist');
        },
      },
    );
  };

  const handleRemoveBlacklist = (address: string, onSuccess?: () => void) => {
    if (!isSelf) {
      message.error('No permission');
      return;
    }
    setLoading(true);
    writeContract(
      {
        address: abiData.address,
        abi: abiData.abi,
        functionName: 'removeBlackList',
        args: [address as `0x${string}`],
      },
      {
        onSuccess: (txHash) => {
          setHash(txHash);
          setCallbackFunc(() => async () => {
            try {
              await deleteBlacklist({
                contractAddress: abiData.address,
                operatorAddress: readContractsData?.[0]?.result?.toString(),
                address: address,
                hash: txHash,
              });
              message.success('Successfully removed from blacklist');
              onSuccess?.();
            } catch (error) {
              console.error('Failed to update database:', error);
              message.error('Transaction succeeded but failed to update database');
            } finally {
              setLoading(false);
              setCallbackFunc(() => () => {});
            }
          });
        },
        onError: (error) => {
          setLoading(false);
          message.error(error.message || 'Failed to remove from blacklist');
        },
      },
    );
  };
  
  return {
    readContractsData,
    handleRedeem,
    handleMint,
    handleTransferOwnership,
    handleAddBlacklist,
    handleRemoveBlacklist,
    status,
    address,
    chainId,
    callbackFunc,
    setCallbackFunc,
    setHash,
    changeNetWork,
    openConnectModal,
    openAccountModal,
    openChainModal,
    writeContract,
  };
}
