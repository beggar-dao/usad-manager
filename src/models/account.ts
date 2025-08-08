import {
  useAccountModal,
  useChainModal,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import {
  useAccount,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

export default function AccountModel() {
  const { address, status, chainId } = useAccount();
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
    if (transactionStatus === "success") {
      callbackFunc();
    } else if (transactionStatus === "error") {
      setCallbackFunc(() => () => {});
      setHash(undefined);
    }
  }, [transactionStatus]);
  const changeNetWork = async (chainId: number) => {
    await switchChain({ chainId });
  };

  return {
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
