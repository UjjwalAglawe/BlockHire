import React from "react";
import {  useSelector } from 'react-redux';

function FreelancerDashboard() {
  const freelancer_info = {
    email: useSelector((state) => state.signup.signup.userInfo.email),
    account: useSelector((state) => state.signup.signup.userInfo.metaMaskAccount),
    name:  useSelector((state) => state.signup.signup.userInfo.username),
    profile_image: "/ProfileImages/professional_img2.jpg",
    occupation: useSelector((state) => state.signup.signup.userInfo.occupation),
    location: useSelector((state) => state.signup.signup.userInfo.location),
    languages: useSelector((state) => state.signup.signup.userInfo.languages),
    description: useSelector((state) => state.signup.signup.userInfo.aboutMe),
    skills: useSelector((state) => state.signup.signup.userInfo.skills),
    total_revenue: 3000,
    active_contract: {
      client: "Hemant R",
      account: "0x4C38Db6a741c548545dBf",
      deadline: "23 April 2025",
    },
  };

  const client = useSelector((state)=> state.signup.client);

  console.log(useSelector((state) => state.signup.signup.userInfo))

  return (
    <div className="font-title p-6 flex-col space-y-6">
      {/* Profile Info */}
      <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
        <div className="flex mb-6">
          <div className="w-[15%] h-[15%] motion-preset-pop motion-duration-250">
            <img
              src={freelancer_info.profile_image}
              alt={freelancer_info.name}
              className="rounded-full w-32 h-32"
            />
          </div>
          <div className="w-2/3 pl-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold">{freelancer_info.name}</h2>
            <div className="text-lg mt-2">{freelancer_info.email}</div>
            <div className="text-lg mt-2">Account: {freelancer_info.account}</div>
            <div className="flex space-x-2 mt-2">
              {client=='client'? null : freelancer_info.occupation.map((item, index) => (
                <span
                  key={index}
                  className="px-2 py-1 border border-gray-300 rounded-md"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-2 text-gray-600">
              <span className="mr-2 font-medium">Location:</span>
              {freelancer_info.location}
            </div>
            <div className="flex mt-2 space-x-2">
              {client=='client'? null : freelancer_info.languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 rounded-md"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      {client=='client'? null : (<div className="border border-gray-300 p-4 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-4">
          {freelancer_info.skills.map((skill, index) => (
            <div
              key={index}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>)}

      {/* About Me */}
      {client=='client'? null : (<div className="border border-gray-300 p-4 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold mb-2">About Me</h3>
        <p>{freelancer_info.description}</p>
      </div>)}

      {/* Active Contract */}
      <div className="border border-gray-300 p-4 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold flex items-center mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z"
              clipRule="evenodd"
            />
          </svg>
          Active Contract
        </h3>
        <p>
          <span className="font-semibold">Client:</span> {freelancer_info.active_contract.client}
        </p>
        <p>
          <span className="font-semibold">Account:</span> {freelancer_info.active_contract.account}
        </p>
        <p>
          <span className="font-semibold">Deadline:</span> {freelancer_info.active_contract.deadline}
        </p>
      </div>
    </div>
  );
}

export default FreelancerDashboard;
