import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import SearchForm from './SearchForm';
import {  useSelector } from 'react-redux';
import ConnectMetaMask from '../Metamask/ConnectMetamask';

export default function Header() {
    const location = useLocation();

    const {currentUser} = useSelector((state)=> state.user)


    //const active = useSelector((state) => state.signup.active);
    //const email = useSelector((state) => state.signup.signup.userInfo.email)
    // console.log(active)

    return (
        <header className="shadow sticky z-50 top-0 ">
            <nav className="bg-white border-gray-200 px-2 lg:px-4 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center  motion-preset-fade motion-duration-200">
                        {/* <img
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        /> */}
                        <h1 className="text-3xl text-primary font-extrabold font mb-4 ">BlockHire</h1>
                    </Link>
                    {
                        currentUser ?
                            (<Link to="/profile" className="flex flex-col items-center gap-4 lg:order-2 font-title text-gray-800">
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
                                {/* { <h4 className="text-sm font-semibold text-gray-400">{email}</h4> } */}
                            </Link>) :
                            (<div className="flex items-center lg:order-2 font-title">
                                <Link
                                    to="/signin"
                                    className="text-white bg-primary  hover:bg-secondary hover:transition-colors hover:duration-300 hover:text-black focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:shadow-2xl transform hover:scale-105 transition duration-200  hover:border-black"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/freelancerRegister"
                                    className="text-white bg-primary  hover:bg-secondary hover:transition-colors hover:duration-300 hover:text-black focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:shadow-2xl transform hover:scale-105 transition duration-200 "
                                >
                                    Register
                                </Link>
                                <ConnectMetaMask/>
                            </div>)
                    }
                    {location.pathname !== '/' && (
                        <div className='motion-preset-pop motion-duration-250'>
                            <SearchForm />
                        </div>
                    )}
                    <div
                        // className="hidden justify-end items-center w-full lg:flex lg:w-auto lg:order-1"
                        className='flex items-end justify-end'
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col font-title justify-end mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 lg:ml-auto ">
                            <li className='motion-preset-pop motion-duration-250'>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-primary lg:p-0 ${location.pathname == '/' ? 'motion-preset-pop motion-duration-250' : ''}`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li className='motion-preset-pop motion-duration-250'>
                                <NavLink
                                    to="/freelancers"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-primary lg:p-0 ${location.pathname == '/' ? 'motion-preset-pop motion-duration-250' : ''}`
                                    }
                                >
                                    Freelancers
                                </NavLink>
                            </li>
                            <li className='motion-preset-pop motion-duration-250'>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-primary lg:p-0 ${location.pathname == '/' ? 'motion-preset-pop motion-duration-250' : ''}`
                                    }
                                >
                                    About us
                                </NavLink>
                            </li>
                            {/* <li className='motion-preset-pop motion-duration-250'>
                                <NavLink
                                    to="/about"
                                    className={({ isActive }) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-primary" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-primary lg:p-0 ${location.pathname == '/'?'motion-preset-pop motion-duration-250':'' }`
                                    }
                                >
                                    Contact us
                                </NavLink>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
