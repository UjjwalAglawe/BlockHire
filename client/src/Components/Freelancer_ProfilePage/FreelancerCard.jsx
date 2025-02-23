import React from 'react'
import { Link } from 'react-router-dom'
import ServiceHeader from '../ServiceHeader/ServiceHeader'

function FreelancerCard() {

    const freelancerInfo = [
        {
            key: 1,
            name: "Ryan W",
            project_image: "/ProjectImages/Web-Development-Projects.png",
            profile_image: "/ProfileImages/Male_professional.jpg",
            description: "I will fix or develop web application in codeigniter or core PHP.",
            price: "200",
            rating: 4,
        },
        {
            key: 2,
            name: "Yash D",
            project_image: "/ProjectImages/PythonProjects1.png",
            profile_image: "/ProfileImages/professional_img2.jpg",
            description: "I am knowledgeable in python languages and had many projects using python.",
            price: "300",
            rating: 4.5,
        },
        {
            key: 3,
            name: "Ryan W",
            project_image: "/ProjectImages/AI-Projects.png",
            profile_image: "/ProfileImages/images3.jpg",
            description: "AI projects developer, able to build Machine and Deep learning models.",
            price: "400",
            rating: 4.5,
        },
        {
            key: 4,
            name: "Ujjwal V A",
            project_image: "/ProjectImages/Web-Development-Projects.png",
            profile_image: "/ProfileImages/Male_professional.jpg",
            description: "I will fix or develop web application in codeigniter or core PHP.",
            price: "200",
            rating: 3.8,
        },
        {
            key: 5,
            name: "Yash D",
            project_image: "/ProjectImages/PythonProjects1.png",
            profile_image: "/ProfileImages/professional_img2.jpg",
            description: "I am knowledgeable in python languages and had many projects using python.",
            price: "300",
            rating: 5,
        },
        {
            key: 6,
            name: "Om W",
            project_image: "/ProjectImages/AI-Projects.png",
            profile_image: "/ProfileImages/images3.jpg",
            description: "AI projects developer, able to build Machine and Deep learning models.",
            price: "400",
            rating: 4,
        },
        {
            key: 7,
            name: "Ryan W",
            project_image: "/ProjectImages/Web-Development-Projects.png",
            profile_image: "/ProfileImages/Male_professional.jpg",
            description: "I will fix or develop web application in codeigniter or core PHP.",
            price: "200",
            rating: 4,
        },
        {
            key: 8,
            name: "Yash D",
            project_image: "/ProjectImages/PythonProjects1.png",
            profile_image: "/ProfileImages/professional_img2.jpg",
            description: "I am knowledgeable in python languages and had many projects using python.",
            price: "300",
            rating: 5,
        },
        {
            key: 9,
            name: "Ryan W",
            project_image: "/ProjectImages/AI-Projects.png",
            profile_image: "/ProfileImages/images3.jpg",
            description: "AI projects developer, able to build Machine and Deep learning models.",
            price: "400",
            rating: 4,
        },
        {
            key: 10,
            name: "Yogesh W",
            project_image: "/ProjectImages/Web-Development-Projects.png",
            profile_image: "/ProfileImages/Male_professional.jpg",
            description: "I will fix or develop web application in codeigniter or core PHP.",
            price: "200",
            rating: 4,
        },
        {
            key: 11,
            name: "Yash D",
            project_image: "/ProjectImages/PythonProjects1.png",
            profile_image: "/ProfileImages/professional_img2.jpg",
            description: "I am knowledgeable in python languages and had many projects using python.",
            price: "300",
            rating: 5,
        },
        {
            key: 12,
            name: "Josh K",
            project_image: "/ProjectImages/AI-Projects.png",
            profile_image: "/ProfileImages/images3.jpg",
            description: "AI projects developer, able to build Machine and Deep learning models.",
            price: "400",
            rating: 4,
        },
    ]


    return (
        <div>
            <ServiceHeader />

            <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-100">
                {freelancerInfo.map((item) => (
                    <Link to="/freelancerwork"
                        key={item.key}
                        className="motion-preset-expand  flex flex-col cursor-pointer bg-white rounded-lg shadow-lg  border border-gray-200 w-72 hover:scale-105 transition duration-200 hover:shadow-lg hover:shadow-blue-200"
                    >
                        {/* Project Image */}
                        <div>
                            <img
                                src={item.project_image}
                                alt="Project"
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                        </div>

                        {/* Profile and Name */}
                        <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                            <img
                                src={item.profile_image}
                                alt="Profile"
                                className="w-12 h-12 rounded-full"
                            />
                            <Link to="/freelancerprofile" className="text-lg font-semibold text-gray-700 hover:underline">{item.name}</Link>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 p-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-yellow-500"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <h3 className="text-gray-600 font-medium">{item.rating}</h3>
                        </div>

                        {/* Description */}
                        <div className="p-4 text-gray-600">{item.description}</div>

                        {/* Price */}
                        <div className="p-4 border-t border-gray-200 text-gray-700 font-semibold">
                            Starting at ${item.price}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default FreelancerCard