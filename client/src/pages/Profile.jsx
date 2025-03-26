import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

const Profile = ({ contract }) => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [showContracts, setShowContracts] = useState(false);

  useEffect(() => {
    if (currentUser.isFreelancer) {
      navigate("/freelancerprofile", { replace: true });
    }
  }, []);

  // Function to fetch contracts from smart contract
  const fetchContracts = async () => {
    if (!contract) {
      console.error("Smart contract not initialized");
      return;
    }

    try {
      const clientId = currentUser.id;
      const clientContracts = await contract.getProjectsByClient(clientId);
      console.log("Raw Contract Response:", clientContracts);

      const fetchedContracts = await Promise.all(
        clientContracts.map(async (contract) => {
          try {
            const response = await fetch(contract.dealURI);
            const projectDetails = await response.json();

            return {
              projectName: projectDetails.projectName || "Unnamed Project",
              projectDescription: projectDetails.projectDescription || "No description",
              projectDeadline: new Date(projectDetails.deadlineTimestamp * 1000).toDateString(),
              totalPrice: ethers.utils.formatEther(contract.totalAmount), // Convert from Wei to CELO
            };
          } catch (error) {
            console.error("Error fetching project details:", error);
            return null;
          }
        })
      );

      // Filter out failed fetches
      setContracts(fetchedContracts.filter((c) => c !== null));
      setShowContracts(true);
    } catch (error) {
      console.error("Error fetching contracts:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard</h2>
        <ul className="space-y-3">
          <li
            className="cursor-pointer text-blue-600 hover:text-blue-800 transition"
            onClick={fetchContracts}
          >
            Contracts
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow max-w-5xl mx-auto pt-8 px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Cover Photo */}
          <div className="relative h-52 bg-gradient-to-r from-blue-500 to-purple-600"></div>

          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-20 mb-6 relative z-10">
              {/* Profile Picture */}
              <div className="h-36 w-36 rounded-full border-4 border-white shadow-md bg-gray-200 overflow-hidden">
                {currentUser ? (
                  <img src={currentUser.profilePhoto} alt={currentUser.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-500 text-5xl font-bold">
                    {currentUser.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Name & MetaMask Address */}
              <div className="mt-5 sm:mt-0 sm:ml-6 flex-grow">
                <h1 className="text-3xl font-bold text-gray-800">{currentUser.name}</h1>
                <p className="text-gray-700">{currentUser.metamaskAddress || "MetaMask Not Connected"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contracts Section */}
        {showContracts && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Contracts</h2>
            {contracts.length > 0 ? (
              <ul className="space-y-3">
                {contracts.map((contract, index) => (
                  <li key={index} className="p-3 border rounded-lg bg-gray-100">
                    <p className="text-gray-800 font-semibold">Project Name: {contract.projectName}</p>
                    <p className="text-gray-600">Description: {contract.projectDescription}</p>
                    <p className="text-gray-600">Deadline: {contract.projectDeadline}</p>
                    <p className="text-gray-600">Total Price: {contract.totalPrice} CELO</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No contracts found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
