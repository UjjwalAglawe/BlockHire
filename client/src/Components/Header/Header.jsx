import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserFailure, deleteUserSuccess, signOutUserStart } from '../../reducer/user/userSlice';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            dispatch(signOutUserStart());
            
            const { data } = await axios.post('/api/auth/signout', {}, { withCredentials: true });

            if (data.message !== 'User has been logged out!') {
                dispatch(deleteUserFailure('Logout failed.'));
                return;
            }

            dispatch(deleteUserSuccess(null)); 
            navigate('/'); 
        } catch (error) {
            dispatch(deleteUserFailure(error.response?.data?.message || error.message));
        }
    };

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-2 lg:px-4 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center motion-preset-fade motion-duration-200">
                        <h1 className="text-3xl text-primary font-extrabold mb-4">BlockHire</h1>
                    </Link>

                    <div className="flex items-end justify-end">
                        <ul className="flex flex-col font-title justify-end mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 lg:ml-auto">
                            {['/', '/freelancers', '/about'].map((path, index) => (
                                <li key={index} className="motion-preset-pop motion-duration-250">
                                    <NavLink
                                        to={path}
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 ${isActive ? 'text-primary' : 'text-gray-700'} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-primary lg:p-0`
                                        }
                                    >
                                        {path === '/' ? 'Home' : path.replace('/', '')}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {currentUser ? (
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={toggleDropdown} className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1}
                                    stroke="currentColor"
                                    className="w-10 h-10 border-black rounded-full border-4 p-2 bg-gray-100 text-black"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
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
                                        {!currentUser.data.isFreelancer && (
                                            <li>
                                                <button onClick={() => navigate(`/freelancerRegister/${currentUser.data.id}`)} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                                                    Become a Freelancer
                                                </button>
                                            </li>
                                        )}
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
                            <Link to="/signin" className="text-white bg-primary hover:bg-secondary transition-colors duration-300 hover:text-black font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                                Log in
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}