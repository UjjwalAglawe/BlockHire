import React, { useRef } from 'react';
import SearchComponent from './SearchComponent';
import SliderService from './SliderService';
import Information from './Information';
import AboutUs from './AboutUs';


function Home() {
    // Reference for the Info section
    const infoRef = useRef(null);

    // Function to handle Learn More button click
    const handleLearnMoreClick = () => {
        infoRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="m-2 font-title">
            {/* Stating title */}
            <div className="flex flex-col h-screen">
                <div className="h-[30%] p-4 flex flex-row">
                    <div className="w-[35%] font-title text-5xl pt-6 font-semibold">
                        Connect with Top Freelancers Effortlessly
                    </div>
                    <div className="w-[65%] flex flex-col justify-between items-center pt-2 pl-4">
                        <div className="h-[50%] font-title text-2xl flex justify-end items-end">
                            Unlock the Future of Freelancing: Trust, Efficiency, and Seamless Collaboration
                        </div>
                        <div className="h-[50%] font-title text-1xl flex justify-evenly items-center">
                            <button className="bg-primary py-2 px-2 mx-2 text-white shadow-xl border-2 border-black hover:shadow-2xl transform hover:scale-105 transition duration-200">
                                Get Started
                            </button>
                            <button
                                className="border-2 border-primary py-2 px-1 shadow-md hover:shadow-2xl transform hover:scale-105 transition duration-200"
                                onClick={handleLearnMoreClick}
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>

                {/* Box and search box */}
                <div className="h-[70%] px-4 relative">
                    <div className="w-full h-full bg-gradient-to-l from-primary to-secondary rounded-lg">1</div>
                    <div className="absolute top-[50%] left-[26%] w-[50%]">
                        <SearchComponent />
                    </div>
                </div>
            </div>

            {/* Slider */}
            <div className="w-full">
                <SliderService />
            </div>

            {/* Info */}
            <div className="flex m-4" >
                <div className="w-[35%] font-title text-4xl font-bold pl-3">
                    Discover the Essential Features of Our Freelancer Showcase Platform
                </div>
                <div className="w-[65%] font-title text-2xl pr-5">
                    Our platform connects clients with verified freelancers, ensuring quality and reliability.
                    Experience seamless smart contract management that simplifies payments and enhances trust.
                </div>
            </div>
            <div ref={infoRef}> <Information /></div>
           
            <AboutUs />

        </div>
    );
}

export default Home;
