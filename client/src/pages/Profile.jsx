import { current } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const Profile = ({ userData }) => {

    const {currentUser} = useSelector((state)=> state.user)
    // const { username } = useParams();
    //  const isFreelancer = true;
    // const navigate = useNavigate();
    // const isFreelancer = userData.accountType === 'freelancer';

    useEffect(() => {

        // if (isFreelancer) {
        //     navigate('/freelancerprofile');
        // }
    }, [])

    console.log(currentUser.data.email)
    


    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-5xl mx-auto pt-8 px-4">

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Cover Photo */}
                    <div className="relative h-52 bg-gradient-to-r from-blue-500 to-purple-600">
                        {userData.coverPhoto && (
                            <img
                                src={userData.coverPhoto}
                                alt="Cover"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className="px-6 pb-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-20 mb-6 relative z-10">
                            {/* Profile Picture */}
                            <div className="h-36 w-36 rounded-full border-4 border-white shadow-md bg-gray-200 overflow-hidden transform hover:scale-105 transition duration-300">
                                {userData.profilePhoto ? (
                                    <img
                                        src={userData.profilePhoto}
                                        alt={userData.username}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-500 text-5xl font-bold">
                                        {userData.username?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            {/* Name & Title */}
                            <div className="mt-5 sm:mt-0 sm:ml-6 flex-grow">
                                <h1 className="text-3xl font-bold text-gray-800">{userData.username}</h1>
                                {userData.title && (
                                    <p className="text-lg text-gray-600">{userData.title}</p>
                                )}
                            </div>

                            {/* Action Button */}
                            <div className="mt-5 sm:mt-0">
                                <button className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md transform hover:scale-105">
                                    {isFreelancer ? 'Hire Me' : 'Connect'}
                                </button>
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className="mb-6">
                            {userData.bio ? (
                                <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
                            ) : (
                                <div className="text-gray-500 border border-dashed border-gray-300 rounded-md p-5 text-center">
                                    {userData.isOwnProfile ? 'Add a bio to tell people about yourself' : 'No bio yet'}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="md:col-span-1 h-full">
                        {/* Full-Length Basic Info Card */}
                        <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Basic Info</h2>
                            <ul className="space-y-4 flex-grow">
                                <li className="flex items-center text-gray-700">
                                    <span className="material-icons mr-2 text-gray-500">email</span>
                                    {userData.email || 'Email not provided'}
                                </li>
                                {userData.location && (
                                    <li className="flex items-center text-gray-700">
                                        <span className="material-icons mr-2 text-gray-500">location_on</span>
                                        {userData.location}
                                    </li>
                                )}
                                {userData.website && (
                                    <li className="flex items-center text-gray-700">
                                        <span className="material-icons mr-2 text-gray-500">link</span>
                                        <a href={userData.website} className="text-blue-600 hover:underline">{userData.website}</a>
                                    </li>
                                )}
                                <li className="flex items-center text-gray-700">
                                    <span className="material-icons mr-2 text-gray-500">calendar_today</span>
                                    Joined {userData.joinDate || 'Recently'}
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Column (for additional content if needed) */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Reviews</h2>
                        {userData.reviews?.length > 0 ? (
                            userData.reviews.map((review, index) => (
                                <div key={index} className="border-b pb-4 mb-4">
                                    <p className="text-gray-700">"{review.comment}"</p>
                                    <div className="text-sm text-gray-600">- {review.clientName}</div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No reviews yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Profile;