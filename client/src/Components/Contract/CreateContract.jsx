import React, { useState,useEffect } from "react";
import { ethers } from "ethers";
// import uploadToPinata from "../../uploadImg"; // Function to upload JSON to IPFS
import { useSelector } from "react-redux";
import uploadPinata from "./uploadPinata";

const CreateContract = ({ contract }) => {
  const [clientId, setClientId] = useState("");
  const [freelancer, setFreelancer] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [abstractDetail, setAbstractDetail] = useState("");
  const [abstractDetailsList, setAbstractDetailsList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to add an abstract detail (task)

  const {currentUser} = useSelector((state)=> state.user);
  useEffect(() => {
    if (currentUser?.id) {
      setClientId(currentUser.id);
    }
  }, [currentUser]);

  const addAbstractDetail = () => {
    if (abstractDetail.trim() === "") return;
    setAbstractDetailsList([...abstractDetailsList, abstractDetail]);
    setAbstractDetail(""); // Clear input after adding
  };

  // Function to remove a task
  const removeAbstractDetail = (index) => {
    const updatedList = abstractDetailsList.filter((_, i) => i !== index);
    setAbstractDetailsList(updatedList);
  };

  const createProject = async () => {
    if (!contract) {
      alert("Contract not initialized!");
      return;
    }
    if (!freelancer || !projectName || !projectDescription || !projectDeadline || totalPrice <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    setLoading(true);
    try {
      // Convert deadline to UNIX timestamp
      const deadlineTimestamp = Math.floor(new Date(projectDeadline).getTime() / 1000);

      // Upload deal details to IPFS
      const dealDetails = { projectName, projectDescription, projectDeadline, totalPrice,clientId,deadlineTimestamp  };
      const dealURI = await uploadPinata(dealDetails);

      // Upload abstract details array to IPFS
      const abstractURI = await uploadPinata({ projectName, abstractDetails: abstractDetailsList });

      console.log("Deal url",dealURI);
      console.log("Abstract url",abstractURI);
      
      if (!dealURI || !abstractURI) {
        alert("Failed to upload details to IPFS!");
        setLoading(false);
        return;
      }

      const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
      const contractWithSigner = contract.connect(signer);

      // Convert totalPrice to Wei
      const priceInWei = ethers.utils.parseEther(totalPrice.toString());

      // Call smart contract function
      const txn = await contractWithSigner.createProject(clientId, freelancer, dealURI, abstractURI, priceInWei);
      await txn.wait();

      alert("Project Created Successfully!");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Transaction Failed!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-800 text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Create Project</h2>

      {/* <input
        type="number"
        placeholder="Client ID"
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        className="w-full p-3 mb-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
      /> */}

      <input
        type="text"
        placeholder="Freelancer Address"
        value={freelancer}
        onChange={(e) => setFreelancer(e.target.value)}
        className="w-full p-3 mb-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="w-full p-3 mb-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <textarea
        placeholder="Project Description"
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        className="w-full p-3 h-24 mb-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
      ></textarea>

      <input
        type="date"
        placeholder="Project Deadline"
        value={projectDeadline}
        onChange={(e) => setProjectDeadline(e.target.value)}
        className="w-full p-3 mb-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <input
        type="number"
        placeholder="Total Price (ETH)"
        value={totalPrice}
        onChange={(e) => setTotalPrice(e.target.value)}
        className="w-full p-3 mb-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
        min="0"
        step="0.01"
      />

      {/* Abstract Details Input & List */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Abstract Details (Tasks)</h3>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter a task..."
            value={abstractDetail}
            onChange={(e) => setAbstractDetail(e.target.value)}
            className="flex-grow p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={addAbstractDetail}
            className="p-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
          >
            Add
          </button>
        </div>
      </div>

      {/* Display Added Tasks */}
      <ul className="mb-4">
        {abstractDetailsList.map((detail, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-700 p-2 rounded-lg mb-2"
          >
            <span>{detail}</span>
            <button
              onClick={() => removeAbstractDetail(index)}
              className="text-red-500 hover:text-red-700 font-bold"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={createProject}
        disabled={loading}
        className={`w-full p-3 rounded-lg text-white font-semibold transition-all duration-300 ${loading
          ? "bg-gray-600 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
          }`}
      >
        {loading ? "Creating..." : "Create Project"}
      </button>
    </div>
  );
};

export default CreateContract;
