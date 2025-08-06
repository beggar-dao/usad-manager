import { useAccount, useSwitchChain } from "wagmi";

export default function AccountModel() {
  const { address, status, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const changeNetWork = async (chainId: number) => {
    await switchChain({ chainId });
  };
  return { status, address, chainId, changeNetWork };
}
