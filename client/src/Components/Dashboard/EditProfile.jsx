import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {  
  updateUserInfoField,
  addItemToArray,
  updateItemInArray,
  deleteItemFromArray, } from '../../reducer/signupSlice';

const EditProfile = () => {
  //client store.js sigup
  const client = useSelector((state)=> state.signup.client);
  const dispatch = useDispatch();

  const { username, location, aboutMe, occupation, skills, languages } = useSelector(
    (state) => state.signup.signup.userInfo
  );

  const [profileImage, setProfileImage] = useState('/ProfileImages/professional_img2.jpg');

  const [currentOccupation, setCurrentOccupation] = useState('');


  const [currentSkill, setCurrentSkill] = useState('');

  const [currentLanguage, setCurrentLanguage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = () => {
    alert('Profile updated successfully!');
  };

  const handleAddItem = (field, currentItem, setCurrentItem) => {
    if (currentItem.trim() !== '') {
      dispatch(addItemToArray({ field, item: currentItem }));
      setCurrentItem('');
    }
  };

  const handleUpdateItem = (field, index, value) => {
    dispatch(updateItemInArray({ field, index, value }));
  };

  const handleDeleteItem = (field, index) => {
    dispatch(deleteItemFromArray({ field, index }));
  };

  ///////////////////////////////////////////////////////
  const handleInChange = (field, value) => {
    dispatch(updateUserInfoField({ field, value }));
  };

  // const renderDynamicInputList = (title, items, setItems, currentItem, setCurrentItem) => (
  //   <div className="mb-6">
  //     <label className="block text-gray-700 mb-2">{title}</label>
  //     <div className="flex flex-col space-y-2">
  //       {/* Input for adding new items */}
  //       <div className="flex items-center space-x-2">
  //         <input
  //           type="text"
  //           value={currentItem}
  //           onChange={(e) => setCurrentItem(e.target.value)}
  //           className="w-36 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           placeholder={`Add new ${title.toLowerCase()}`}
  //         />
  //         <button
  //           onClick={() => handleAddItem(setItems, items, currentItem, setCurrentItem)}
  //           className="text-blue-600 hover:text-blue-800"
  //         >
  //           + Add
  //         </button>
  //       </div>

  //       {/* Dynamic list of items */}
  //       <div className="flex flex-wrap items-center space-x-4">
  //         {items.map((item, index) => (
  //           <div key={index} className="flex items-center space-x-2">
  //             <input
  //               type="text"
  //               value={item}
  //               onChange={(e) => handleInputChange(setItems, items, index, e.target.value)}
  //               className="w-36 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             />
  //             <button
  //               onClick={() => handleDeleteItem(setItems, items, index)}
  //               className="text-red-600 hover:text-red-800 text-xs"
  //             >
  //               ❌
  //             </button>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );


  function renderDynamicInputList(title, items, field, currentItem, setCurrentItem) {
    return (
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">{title}</label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={currentItem}
            onChange={(e) => setCurrentItem(e.target.value)}
            className="w-36 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Add new ${title.toLowerCase()}`}
          />
          <button
            onClick={() => handleAddItem(field, currentItem, setCurrentItem)}
            className="text-blue-600 hover:text-blue-800"
          >
            + Add
          </button>
        </div>
        <div className="flex flex-wrap items-center space-x-4 mt-2">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleUpdateItem(field, index, e.target.value)}
                className="w-36 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleDeleteItem(field, index)}
                className="text-red-600 hover:text-red-800 text-xs"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className="mx p-6 bg-white rounded-lg shadow-md h-full">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Edit Profile</h2>

      <div className="flex items-center space-x-6 mb-6">
        <div className="relative">
          <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full object-cover" />
          <label className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full cursor-pointer">
            <input 
              type="file" 
              className="hidden" 
              onChange={handleImageChange}
            />
            📸
          </label>
        </div>
        <div className='justify-center items-center'>
          <div className='text-xl font-semibold ml-1'>Name</div>
          <div className='text-gray-400 m-1'>Display your name on your profile</div>
          <input
            type="text"
            value={username}
            onChange={(e) => handleInChange('username',e.target.value)}
            className="text-xl font-semibold text-gray-700 mb-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Name"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className='justify-center items-center'>
          <div className='text-xl font-semibold ml-1'>Location</div>
          <div className='text-gray-400 m-1'>Display the location on your profile</div>
          <input
            type="text"
            value={location}
            onChange={(e) => handleInChange('location',e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Location"
          />
        </div>
        {client=='client' ? null :<div className='justify-center items-center'>
          <div className='text-xl font-semibold ml-1 mt-2'>About Me</div>
          <div className='text-gray-400 m-1'>A short description about you</div>
          <textarea
            value={aboutMe}
            onChange={(e) => handleInChange('aboutMe',e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
            rows="4"
          />
        </div>}
      </div>

      {client=='client' ? null :renderDynamicInputList('Occupation', occupation, "occupation",  currentOccupation, setCurrentOccupation)}
      {client=='client' ? null :renderDynamicInputList('Skills', skills, "skills", currentSkill, setCurrentSkill)}
      {client=='client' ? null :renderDynamicInputList('Languages', languages,"languages", currentLanguage, setCurrentLanguage)}

      <button 
        onClick={handleSaveChanges}
        className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditProfile;
