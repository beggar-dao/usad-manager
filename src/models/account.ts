import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import {
  useAccount,
  useReadContracts,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import abiData from "@/utils/abi";
import { etherToWei } from "@/utils/index";
import { useModel } from "@umijs/max";
import { message } from "antd";

export default function AccountModel() {
  const { setLoading } = useModel("global");
  const { address, status, chainId } = useAccount();

  const { data: readContractsData, refetch: readContractsRefetch } =
    useReadContracts({
      contracts: [
        {
          address: abiData.address,
          abi: abiData.abi,
          chainId: 9200,
          functionName: "getOwner",
        },
        {
          address: abiData.address,
          abi: abiData.abi,
          chainId: 9200,
          functionName: "_totalSupply",
        },
        {
          address: abiData.address,
          abi: abiData.abi,
          chainId: 9200,
          functionName: "balanceOf",
          args: [address as `0x${string}`],
        },
      ],
    });
  console.log(readContractsData);
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const { writeContract } = useWriteContract();
  const [callbackFunc, setCallbackFunc] = useState(
    () => () => console.log("callback")
  );
  const { switchChain } = useSwitchChain();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const { status: transactionStatus } = useWaitForTransactionReceipt({
    hash,
  });
  useEffect(() => {
    console.log("transactionStatus", transactionStatus);
    if (transactionStatus === "success") {
      callbackFunc();
    } else if (transactionStatus === "error") {
      setCallbackFunc(() => () => {});
      setHash(undefined);
      setLoading(false);
    }
  }, [transactionStatus]);
  const changeNetWork = async (chainId: number) => {
    await switchChain({ chainId });
  };
  const handleMint = (account: number) => {
    console.log(etherToWei(account), "etherToWei(account)");
    setLoading(true);
    writeContract(
      {
        address: abiData.address,
        abi: abiData.abi,
        functionName: "issue",
        args: [etherToWei(account)],
      },
      {
        onSuccess: (data) => {
          console.log(data, "handleMint");
          setHash(data);
          setCallbackFunc(() => () => {
            message.success("Mint success");
            readContractsRefetch();
            setLoading(false);
            setCallbackFunc(() => () => {});
          });
        },
        onError: (error) => {
          setLoading(false);
          console.log(error);
          message.error(error.message);
        },
      }
    );
  };
  const handleRedeem = (account: number) => {
    setLoading(true);
    writeContract(
      {
        address: abiData.address,
        abi: abiData.abi,
        functionName: "redeem",
        args: [etherToWei(account)],
      },
      {
        onSuccess: (data) => {
          setHash(data);
          setCallbackFunc(() => () => {
            message.success("Burn success");
            readContractsRefetch();
            setLoading(false);
            setCallbackFunc(() => () => {});
          });
        },
        onError: (error) => {
          setLoading(false);
          console.log(error);
          message.error(error.message);
        },
      }
    );
  };
  const handleTransferOwnership = (address: string) => {
    setLoading(true);
    writeContract(
      {
        address: abiData.address,
        abi: abiData.abi,
        functionName: "transferOwnership",
        args: [address],
      },
      {
        onSuccess: (data) => {
          setHash(data);
          setCallbackFunc(() => () => {
            message.success("Transfer ownership success");
            readContractsRefetch();
            setLoading(false);
            setCallbackFunc(() => () => {});
          });
        },
        onError: (error) => {
          setLoading(false);
          console.log(error);
          message.error(error.message);
        },
      }
    );
  };
  return {
    readContractsData,
    handleRedeem,
    handleMint,
    handleTransferOwnership,
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
