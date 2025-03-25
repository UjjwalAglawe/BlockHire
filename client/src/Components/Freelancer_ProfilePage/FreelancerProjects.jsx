import React from 'react';
import { Link } from 'react-router-dom';

function FreelancerProjects() {
    const project = [
        {
            image: "/ProjectImages/AI-Projects.png",
            description: "AI projects developer, able to build Machine and Deep learning models.",
            tools: ["Django", "Flask", "Python"],
            price: 2000,
        },
        {
            image: "/ProjectImages/Web-Development-Projects.png",
            description: "I will fix or develop web application in CodeIgniter or core PHP.",
            tools: ["PHP", "WordPress", "Python"],
            price: 3000,
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Projects</h1>
            <h4 className="text-gray-500 mb-6">Add or edit your projects.</h4>

            {/* ADD BUTTON */}
            <div className="flex justify-center mb-6">
                <Link to="/freelancerprofile/addprojects" className="motion-preset-expand motion-duration-250 flex items-center justify-center gap-2 bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-secondary hover:text-black">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    <span>Add Project</span>
                </Link>
            </div>

            {/* Projects */}
            <div className="flex flex-col gap-6">
                {project.map((item, index) => (
                    <div
                        key={index}
                        className="motion-preset-expand flex flex-col md:flex-row bg-white border rounded-lg shadow-lg p-4 gap-4"
                    >
                        {/* Project Image */}
                        <div className="w-full md:w-1/3 flex justify-center items-center">
                            <img
                                src={item.image}
                                alt="Project Preview"
                                className="w-full h-auto rounded-lg object-cover"
                            />
                        </div>

                        {/* Project Details */}
                        <div className="w-full md:w-2/3 flex flex-col justify-between">
                            <div>
                                <p className="mb-2">
                                    <strong>Description: </strong>
                                    {item.description}
                                </p>
                                <p className="mb-2">
                                    <strong>Tools: </strong>
                                    {item.tools.join(", ")}
                                </p>
                                <p className="text-green-600 font-bold">
                                    <strong>Price: </strong>${item.price}
                                </p>
                            </div>

                            {/* Edit/Delete Buttons */}
                            <div className="flex gap-4 mt-4">
                                <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                                        />
                                    </svg>
                                    Edit
                                </button>
                                <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                        />
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FreelancerProjects;
