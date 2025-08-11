import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount, useSwitchChain } from "wagmi";

// 创建自定义连接按钮组件
export default function CustomConnectButton() {
  const { isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  // const targetChainId = 9200; // 你的目标链 ID

  // useEffect(() => {
  //   if (isConnected && chain?.id !== targetChainId && switchChain) {
  //     switchChain({
  //       chainId: targetChainId,
  //     });
  //   }
  // }, [isConnected, chain, switchChain]);

  return (
    <ConnectButton
      showBalance={false}
      accountStatus="address"
      label="Sign in"
    />
  );
}
