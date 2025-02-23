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
            const provider = new ethers.BrowserProvider(window.ethereum);
            const accounts = await provider.send("eth_requestAccounts", []);
            setAccount(accounts[0]);
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