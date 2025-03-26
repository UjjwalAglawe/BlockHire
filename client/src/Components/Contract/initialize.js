import { ethers } from "ethers";
import { freelancing_abi } from "./FreelancingABI";

const CONTRACT_ADDRESS = "0x3A5CeB9Bc2D6FdfE3c492C1E80AAFd2717e26784";
// const CONTRACT_ADDRESS = "0x76C93e693A84B08A9771511580559F85f0f0AB0f";

export const initializeContract = async () => {
  try {
    if (!window.ethereum) {
      console.error("MetaMask not detected!");
      return null;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Use ethers v5 Web3Provider instead of BrowserProvider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, freelancing_abi, signer);

    console.log("Freelancing Contract Initialized:", contract);
    return contract;
  } catch (error) {
    console.error("Error initializing contract:", error);
    return null;
  }
};
