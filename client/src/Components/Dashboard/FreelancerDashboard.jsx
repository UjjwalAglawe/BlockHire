import React from "react";
import { useSelector } from 'react-redux';

function FreelancerDashboard() {
  const { currentUser } = useSelector((state) => state.user);
  console.log("Skills are", currentUser);
  
  return (
    <div className="font-title p-6 flex-col space-y-6">
      {/* Profile Info */}
      <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
        <div className="flex mb-6">
          <div className="w-[15%] h-[15%] motion-preset-pop motion-duration-250">
            <img
              src={currentUser.profile_image || "/ProfileImages/default_profile.jpg"}
              alt={currentUser.name}
              className="rounded-full w-32 h-32"
            />
          </div>
          <div className="w-2/3 pl-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold">{currentUser.name}</h2>
            <div className="text-lg mt-2">{currentUser.email}</div>
            <div className="text-lg mt-2">Account: {currentUser.freelancer.metamaskAddress}</div>
            <div className="text-lg mt-2 font-semibold">Title: {currentUser.freelancer.title}</div>
            <div className="text-lg mt-2 font-semibold">Hourly Rate: ${currentUser.freelancer.hourlyRate}/hr</div>
            <div className="text-lg mt-2 font-semibold">Created At: {new Date(currentUser.createdAt).toLocaleDateString()}</div>
            <div className="flex space-x-2 mt-2">
              {currentUser.occupation?.map((item, index) => (
                <span key={index} className="px-2 py-1 border border-gray-300 rounded-md">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-2 text-gray-600">
              <span className="mr-2 font-medium">Location:</span>
              {currentUser.location}
            </div>
            <div className="flex mt-2 space-x-2">
              {currentUser.languages?.map((lang, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 rounded-md">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="border border-gray-300 p-4 rounded-lg shadow-sm"> 
        <h3 className="text-xl font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-4">
          {currentUser.freelancer?.skills?.map((skill, index) => (
            <div key={index} className="px-4 py-2 border border-gray-300 rounded-md">
              {skill.skill}
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Education</h3>
        <ul className="list-disc pl-5">
          {currentUser.freelancer.education}
        </ul>
      </div>

      {/* About Me */}
      <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Bio</h3>
        <p>{currentUser.freelancer.bio}</p>
      </div>

      {/* Active Contract */}
      {currentUser.active_contract && (
        <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold flex items-center mb-2">Active Contract</h3>
          <p>
            <span className="font-semibold">Client:</span> {currentUser.active_contract.client}
          </p>
          <p>
            <span className="font-semibold">Account:</span> {currentUser.active_contract.account}
          </p>
          <p>
            <span className="font-semibold">Deadline:</span> {currentUser.active_contract.deadline}
          </p>
        </div>
      )}
    </div>
  );
}

export default FreelancerDashboard;
