import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConnectMetaMask from "../Components/Metamask/ConnectMetamask";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser?.isFreelancer) {
      navigate("/freelancerprofile", { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <div className="max-w-5xl mx-auto p-6 font-title">
      {/* Cover Photo */}
      <div className="relative h-48 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 mb-8"></div>

      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 px-2">
        {/* Profile Picture */}
        <div className="rounded-full border-4 border-white shadow-md overflow-hidden w-36 h-36 bg-gray-200">
          {currentUser?.profilePhoto ? (
            <img
              src={currentUser.profilePhoto}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-blue-100 text-blue-500 text-5xl font-bold">
              {currentUser?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Name & MetaMask Address */}
        <div className="mt-4 sm:mt-0 sm:ml-8 flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">{currentUser?.name}</h1>
          <div className="text-gray-700">
            <ConnectMetaMask />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
