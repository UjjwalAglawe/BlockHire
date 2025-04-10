import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import metamask from "../../assets/metamask.svg"

const ConnectMetaMask = () => {
    const [account, setAccount] = useState(null);

    const connectWallet = async () => {
        if (!window.ethereum) {
            toast.error("MetaMask is not installed!");
            return;
        }
    
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum); // ✅ v5 syntax
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            setAccount(address);
            toast.success("Connected to MetaMask");
        } catch (error) {
            console.error(error);
            toast.error("Failed to connect MetaMask");
        }
    };

    return (
        <div onClick={connectWallet} className=" bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
      <img src={metamask} className="w-6 h-6" />
      {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect MetaMask"}
    </div>
    );
};

export default ConnectMetaMask;