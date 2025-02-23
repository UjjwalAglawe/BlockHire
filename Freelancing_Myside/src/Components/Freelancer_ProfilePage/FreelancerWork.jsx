import React from 'react'
import { Link } from 'react-router-dom'

function FreelancerWork() {

    const freelancer_work_info = {
        name: "Pankaj S",
        profile_image: "/ProfileImages/professional_img2.jpg",
        project_description: "I will design and develop your Flask applications",
        location: "India",
        languages: ["English", "Hindi"],
        occupation: ["Python", "Web development", "Machine Learning"],
        tools: ["WordPress", "PHP", "Django", "Flask"],
        mywork_description: "Are you looking to enhance your online presence with a state-of-the-art SaaS application? Your search ends here! My name is Pankaj and over the past 4 years, I have worked with multiple clients from different regions of the world to help them with their businesses.",
        what_can_u_expect: [
            "Custom SaaS Development: Tailored applications designed to meet your unique business requirements and goals using modern frameworks like next js, node js, and express.",
            "Full-Stack Proficiency: Comprehensive front-end and back-end development expertise, ensuring robust functionality and seamless user experiences.",
            "Scalability & Performance: Solutions engineered for scalability, guaranteeing optimal performance as your user base grows.",
            "Integration & Deployment: Smooth integration of third-party services and APIs and secure deployment processes for a hassle-free launch.",
            "Collaborative Partnership: Your input matters! Expect open communication and collaboration throughout the development process to ensure your vision is fully realized.",
        ],
        work_description: {
            price: 2000,
            deadline: "10-day delivery",
            work_point: [
                "7 pages",
                "Design customization",
                "Content upload",
                "Responsive design"
            ]
        },

    }
    return (
        <div className='font-title p-6'>
            {/* Profile Info */}
            <div className="flex mb-6">
                <div className="w-[25%] h-[20%]">
                    <img
                        src={freelancer_work_info.profile_image}
                        alt={freelancer_work_info.name}
                        className="rounded-full w-fit motion-preset-expand motion-duration-200"
                    />
                </div>
                <div className="w-2/3 pl-6 flex flex-col justify-center">
                    <Link to="/freelancerprofile" className="text-2xl font-bold">{freelancer_work_info.name}</Link>

                    <div className="flex space-x-2 mt-2">
                        {freelancer_work_info.occupation.map((item, index) => (
                            <div
                                key={index}
                                className="px-2 py-1 border border-gray-300 rounded-md"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                    <div className="mt-2 text-gray-600 flex">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ml-2">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.547 4.505a8.25 8.25 0 1 0 11.672 8.214l-.46-.46a2.252 2.252 0 0 1-.422-.586l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 0 1-1.384-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.279-2.132Z" clipRule="evenodd" />
                        </svg>

                        {freelancer_work_info.location}</div>
                    <div className="flex mt-2 space-x-2">
                        {freelancer_work_info.languages.map((lang, index) => (
                            <div key={index} className="px-2 py-1 bg-gray-100 rounded-md">
                                {lang}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Me */}

            <div className="flex">
                {/* Left Section */}
                <div className="mb-6 w-[70%] flex flex-col">
                    <h3 className="text-xl font-semibold mb-2">About Me</h3>
                    <p>{freelancer_work_info.mywork_description}</p>
                    <div className="flex flex-col mt-4">
                        <h3 className="font-medium text-lg mb-2">What can you expect from me:</h3>
                        <ul className="pl-4 list-disc text-gray-800">
                            {freelancer_work_info.what_can_u_expect.map((item, index) => (
                                <li key={index} className="mb-1 text-base">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right Section */} {/* Continue */}
                <div className="border border-black flex flex-col justify-between w-[30%] ml-4 rounded-lg shadow-md">
                    <p className="mt-2 text-green-500 px-4 py-2 text-xl font-semibold bg-gray-100 rounded-t-lg">
                        From: {freelancer_work_info.work_description.price}
                    </p>
                    <div className="flex flex-col px-4 py-2">
                        <div className="flex items-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-2 text-gray-700">
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                            </svg>
                            <h3 className="text-gray-800 font-medium text-base">Deadline: {freelancer_work_info.work_description.deadline}</h3>
                        </div>
                        <ul className="list-inside list-disc pl-2 text-gray-800">
                            {freelancer_work_info.work_description.work_point.map((item, index) => (
                                <li key={index} className="mb-1 text-sm">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button className="m-4 px-8 py-3 text-white bg-primary justify-center items-center flex rounded-lg font-semibold hover:text-black hover:bg-secondary transition duration-200">
                        <h3>Contact Me</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-2">
                            <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>



            {/* Tools */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Tools</h3>
                <div className="flex flex-wrap gap-4">
                    {freelancer_work_info.tools.map((skill, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FreelancerWork