import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { updateClient } from '../reducer/signupSlice';

function FreelancerRegister() {
  // "client" is selected by default
  const client = useSelector((state)=> state.signup.client);
  const [selectedOption, setSelectedOption] = useState(client);
  const dispatch = useDispatch();

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
    //Here i want to update client state only , how can  i do
    dispatch(updateClient(option));

  };

  return (
    <>
      <div className="h-screen w-auto flex flex-col justify-center items-center">
        <div className="h-[30%] flex justify-end items-center flex-wrap">
          <div className="px-10 pb-1 text-4xl font-bold">
            <strong className="text-primary">Username,</strong> your account has been created!
            <br />
            <p className="text-center">What brings you to BlockHire?</p>
          </div>
        </div>


        <div className="h-[50%] w-screen flex flex-wrap justify-evenly">
          {/* Client */}
          <div
            className={`w-[40%] flex font-bold text-xl border-2 border-black m-2 cursor-pointer rounded-xl ${
              selectedOption === 'client' ? 'bg-gray-200' : ''
            }`}
            id="client"
            onClick={() => handleCheckboxChange('client')}
          >
            <div className="flex flex-col w-[90%] h-full justify-center items-center">
              <div>
                <img src="/FreelancerLoginPageImages/client.png" alt="" />
              </div>
              <div className="mt-3">Buying freelance services</div>
            </div>
            <div className="w-[10%] text-2xl">
              <input
                type="checkbox"
                className="transform scale-150"
                id="client_check"
                checked={selectedOption === 'client'}
                readOnly
              />
            </div>
          </div>

          {/* Developer */}
          <div
            className={`w-[40%] flex font-bold text-xl border-2 border-black m-2 cursor-pointer rounded-xl ${
              selectedOption === 'developer' ? 'bg-gray-200' : ''
            }`}
            id="developer"
            onClick={() => handleCheckboxChange('developer')}
          >
            <div className="flex flex-col w-[90%] h-full justify-center items-center">
              <div>
                <img src="/FreelancerLoginPageImages/developer.png" alt="" />
              </div>
              <div className="mt-3">Selling freelance services</div>
            </div>
            <div className="w-[10%] text-2xl">
              <input
                type="checkbox"
                className="transform scale-150"
                id="developer_check"
                checked={selectedOption === 'developer'}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Next Button div */}
        <Link to="/signupfreelancer" className="h-[20%] flex justify-end items-end relative">
          <button className="mb-4 mr-4 py-2 px-8 text-white text-xl transition-all duration-300 hover:bg-blue-600 hover:shadow-lg bg-primary rounded-lg">
            Next
          </button>
        </Link>
      </div>
    </>
  );
}

export default FreelancerRegister;
