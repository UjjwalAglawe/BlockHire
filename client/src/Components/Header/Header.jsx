import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchForm from './SearchForm';
import ConnectMetaMask from '../Metamask/ConnectMetamask';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    // const { currFreelancer } = useSelector((state) => state.freelancer)
    
    // console.log(currFreelancer);

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        console.log("User logged out");
        console.log(currentUser.data);

        // Add your logout logic here (clear state, redirect, etc.)
    };

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-2 lg:px-4 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center motion-preset-fade motion-duration-200">
                        <h1 className="text-3xl text-primary font-extrabold mb-4">BlockHire</h1>
                    </Link>

                    {/* Navbar Links */}
                    <div className="flex items-end justify-end">
                        <ul className="flex flex-col font-title justify-end mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 lg:ml-auto">
                            <li className="motion-preset-pop motion-duration-250">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-primary lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className="motion-preset-pop motion-duration-250">
                                <NavLink
                                    to="/freelancers"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-primary lg:p-0`
                                    }
                                >
                                    Freelancers
                                </NavLink>
                            </li>
                            <li className="motion-preset-pop motion-duration-250">
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-primary lg:p-0`
                                    }
                                >
                                    About us
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Search Form */}
                    {location.pathname !== '/' && (
                        <div className="motion-preset-pop motion-duration-250">
                            <SearchForm />
                        </div>
                    )}

                    {/* Profile Icon or Login/Register Buttons */}
                    {currentUser ? (
                        <div className="relative">
                            <button onClick={toggleDropdown} className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1}
                                    stroke="currentColor"
                                    className="w-10 h-10 border-black rounded-full border-4 p-2 bg-gray-100 text-black"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                                    />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                                    <ul className="py-2 text-gray-800">
                                        <li>
                                            <button onClick={() => navigate('/userprofile')} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                                                Profile
                                            </button>
                                        </li>
                                        {
                                            !currentUser.data.isFreelancer && 
                                            <li>
                                                <button onClick={() => navigate(`/freelancerRegister/${currentUser.data.id}`)} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                                                    Become a Freelancer
                                                </button>
                                            </li>
                                        }
                                        <li>
                                            <button onClick={handleLogout} className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-600">
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center lg:order-2 font-title">
                            <Link
                                to="/signin"
                                className="text-white bg-primary hover:bg-secondary transition-colors duration-300 hover:text-black focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                            >
                                Log in
                            </Link>
                            {/* <Link
                                to="/freelancerRegister"
                                className="text-white bg-primary hover:bg-secondary transition-colors duration-300 hover:text-black focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2"
                            >
                                Register
                            </Link> */}
                            {/* <ConnectMetaMask /> */}
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
