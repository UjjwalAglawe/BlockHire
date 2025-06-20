import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ethers } from "ethers";

const FetchContracts = ({ contract, isFree }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [contracts, setContracts] = useState([]);
  const [visibleIndex, setVisibleIndex] = useState(null);
  const [abstractDetails, setAbstractDetails] = useState({});

  const fetchAbstractDetails = async (abstractURI, idx) => {
    try {
      const response = await fetch(abstractURI);
      const data = await response.json();
      setAbstractDetails((prev) => ({ ...prev, [idx]: data }));
      setVisibleIndex(idx); // Show this detail
    } catch (err) {
      console.error("Failed to fetch abstract details:", err);
    }
  };

  const handleReleasePayment = async (projectId) => {
  try {
    // Fetch project details from the contract
    const project = await contract.projects(projectId);
    const totalAmount = project.totalAmount;
    const depositedAmount = project.depositedAmount;

    // Calculate the remaining amount (in wei)
    const remainingAmount = totalAmount.sub(depositedAmount);

    // Call releasePayment with remaining 70% if required
    const tx = await contract.releasePayment(projectId, {
      value: remainingAmount // if 0, no extra ETH is sent
    });

    await tx.wait();
    alert("Payment released successfully.");
  } catch (err) {
    console.error("Failed to release payment:", err);
    alert("Failed to release payment. " + (err?.data?.message || err.message));
  }
};


  const handleUpdateProject = async (projectId) => {
    const newDealURI = prompt("Enter new Deal URI:");
    if (!newDealURI) return;

    try {
      const tx = await contract.updateProjectDetails(projectId, newDealURI);
      await tx.wait();
      alert("Project updated successfully.");
    } catch (err) {
      console.error("Failed to update project:", err);
      alert("Failed to update project.");
    }
  };

  useEffect(() => {
    const fetchContracts = async () => {
      if (!contract || !currentUser) return;
      console.log("Fetching contracts...");

      try {
        let allContracts;
        if (isFree) {
          allContracts = await contract.getProjectsByFreelancer(currentUser.freelancer.metamaskAddress);
        } else {
          allContracts = await contract.getProjectsByClient(currentUser.id);
        }

        const fetched = await Promise.all(
          allContracts.map(async (c, i) => {
            try {
              const res = await fetch(c.dealURI);
              const details = await res.json();

              return {
                projectId: i + 1, // Assuming smart contract projects are sequentially stored
                projectName: details.projectName || "Unnamed Project",
                projectDescription: details.projectDescription || "No description",
                projectDeadline: new Date(details.deadlineTimestamp * 1000).toDateString(),
                totalPrice: ethers.utils.formatEther(c.totalAmount),
                abstractURI: c.abstractURI,
              };
            } catch (err) {
              console.error("Error fetching project details:", err);
              return null;
            }
          })
        );

        setContracts(fetched.filter(Boolean));
      } catch (err) {
        console.error("Error fetching contracts:", err);
      }
    };

    fetchContracts();
  }, [contract, currentUser]);

  if (!contracts.length) return null;

  return (
    <section className="px-4 py-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Contracts</h2>
      <ul className="space-y-6">
        {contracts.map((c, idx) => (
          <li key={idx} className="p-5 border border-gray-300 rounded-md bg-white shadow-md">
            <p className="font-semibold text-lg text-gray-900">Project Name: {c.projectName}</p>
            <p className="text-gray-700 mt-1">Description: {c.projectDescription}</p>
            <p className="text-gray-700">Deadline: {c.projectDeadline}</p>
            <p className="text-gray-700 mb-2">Total Price: {c.totalPrice} CELO</p>

            <button
              onClick={() => fetchAbstractDetails(c.abstractURI, idx)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Get Details
            </button>

            {!isFree && (
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleReleasePayment(c.projectId)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Release Payment
                </button>
                <button
                  onClick={() => handleUpdateProject(c.projectId)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                >
                  Update Project
                </button>
              </div>
            )}

            {visibleIndex === idx && abstractDetails[idx] && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg border">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Abstract Details for "{abstractDetails[idx].projectName}"
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {abstractDetails[idx].abstractDetails.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FetchContracts;
