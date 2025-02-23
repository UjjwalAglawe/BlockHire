import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Information() {
    const active = useSelector((state) => state.signup.active);
    return (
        <div>
            <div className="flex flex-col justify-between items-center font-title bg-gray-50 py-3">
                {/* Section Title */}
                <h2 className="text-3xl font-bold text-gray-800 mb-8 bg-gradient-to-l from-primary to-primary bg-clip-text text-transparent">
                    Discover Our Key Features
                </h2>

                {/* Features Section */}
                <div className="flex flex-wrap justify-center gap-8">
                    {/* Feature 1 */}
                    <div className="p-6 w-[300px] flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                        <div className="aspect-square w-full overflow-hidden rounded-lg mb-4">
                            <img
                                src="/HomePage_images/Woman-In-Crypto--Streamline-Brooklyn.png"
                                alt="Smart Contract Management"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
                            Smart Contract Management for Hassle-Free Payments and Dispute Resolution
                        </h3>
                        <p className="text-sm text-gray-500 text-center">
                            Our smart contracts ensure secure transactions and clear project guidelines.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="p-6 w-[300px] flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                        <div className="aspect-square w-full overflow-hidden rounded-lg mb-4">
                            <img
                                src="/HomePage_images/Blockchain-Distribution-2--Streamline-Brooklyn.png"
                                alt="Secure Transaction"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
                            Secure Transactions Using Blockchain
                        </h3>
                        <p className="text-sm text-gray-500 text-center">
                            Using blockchain, transactions are securely stored in blocks.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="p-6 w-[300px] flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                        <div className="aspect-square w-full overflow-hidden rounded-lg mb-4">
                            <img
                                src="/HomePage_images/Hr--Streamline-Brooklyn.png"
                                alt="Verified Freelancers"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2 text-center">
                            Verified Freelancers for Your Peace of Mind and Project Success
                        </h3>
                        <p className="text-sm text-gray-500 text-center">
                            Choose from a curated list of top-rated professionals.
                        </p>
                    </div>
                </div>
            </div>


            <div className='flex flex-col justify-between my-2'>
                <div className='flex items-center justify-center'>
                    <div className='aspect-square w-40 overflow-hidden rounded-lg m-4'>
                        <img src="/HomePage_images/Businessman-Giving-A-Keynote-2--Streamline-Brooklyn.png"
                            alt="" className='w-full h-full object-cover' />
                    </div>
                    <div className='font-bold text-4xl items-center justify-center bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent'>Discover How Our Platform Empowers You</div>
                </div>
                <div className='flex mx-24 my-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mx-2">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
                    </svg>

                    <h3 className='items-center'>Secured Payments with Smart Contracts: Our platform uses Ethereum-based smart contracts to securely hold payments in escrow, ensuring funds are only released when project milestones are met.</h3>
                </div>
                <div className='flex mx-24 my-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 mx-2">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clipRule="evenodd" />
                    </svg>

                    <h3 className='items-center'>Guaranteed Transactions on the Blockchain: Leveraging the transparency of the Ethereum blockchain, our platform guarantees payments to freelancers upon successful project completion, creating a trustless, reliable payment process for both parties.</h3>
                </div>
                <div className=' mx-24 '>
                    <h1 className='text-xl text-center font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent font-title '>To use our platform, clients and freelancers are required to have a MetaMask wallet, which allows for secure Ethereum-based transactions and easy management of funds directly within our system.</h1>
                </div>
            </div>




            {/* 3 INFO */}

            <div className='flex justify-evenly'>

                <div className='my-4 flex flex-col items-center '>
                    <div className='border-2 border-black'> <img src="/HomePage_images/Profile-2--Streamline-Milano.png" className='w-60' alt="" /></div>
                    <div className='text-lg font-bold'>Create Your Account in Minutes</div>
                    <div className='text-center'>Sign up easily to access a world of talent.</div>
                </div>
                <div className='my-4 flex flex-col items-center '>
                    <div className='border-2 border-black'> <img src="/HomePage_images/Business-Deal-1--Streamline-Milano.png" className='w-60' alt="" /></div>
                    <div className='text-lg font-bold text-center'>Browse and Filter Freelancers by Skills</div>
                    <div className='text-center'>Use our advanced filters to find the perfect match.</div>
                </div>
                <div className='my-4 flex flex-col items-center '>
                    <div className='border-2 border-black'> <img src="/HomePage_images/Designer-Working-1--Streamline-Milano.png" className='w-60' alt="" /></div>
                    <div className='text-lg font-bold'>Communicate Instantly with Live Chat</div>
                    <div className=''>Engage with freelancers for discussions.</div>
                </div>

                

            </div>

            {
                active==true ? null :(
                    <div className='flex justify-center items-center'>
                    <Link
                        to="/signup"
                        className="text-white bg-primary  hover:bg-secondary hover:transition-colors hover:duration-300 hover:text-black focus:ring-2 focus:ring-black font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none hover:shadow-2xl transform hover:scale-105 transition duration-200 "
                    >
                        Signup
                    </Link>
                </div>
                )
            }
        </div>
    );
}

export default Information;
