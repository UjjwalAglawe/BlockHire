import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

function FreelancerProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { currentUser } = useSelector((state) => state.user);

    // Ensure freelancerId is available
    const freelancerId = currentUser?.freelancer?.id;

    useEffect(() => {
        const fetchProjects = async () => {
            if (!freelancerId) {
                setError('Freelancer ID not found. Please log in as a freelancer.');
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get(`/api/freelancers/${freelancerId}/projects`, {
                    withCredentials: true,
                });
                console.log('API Response:', response.data.data);

                // // Ensure the data is an array
                // setProjects(Array.isArray(response.data) ? response.data.data : []);
                setProjects(response.data.data);
                console.log(projects);

            } catch (err) {
                console.error('Error fetching projects:', err);
                setError('Failed to fetch projects. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [freelancerId]);

    // Handle project deletion
    async function handleDelete(projectId) {
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        try {
            await axios.delete(`/api/freelancers/${freelancerId}/projects/${projectId}`, {
                withCredentials: true,
            });

            // Optimistically update the UI
            setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
        } catch (err) {
            console.error("Error deleting project:", err);
            alert("Failed to delete project. Please try again.");
        }
    }

    // Show loading message while data is being fetched
    if (loading) {
        return <div className="p-6">Loading projects...</div>;
    }

    // Show error message if there is an error
    if (error) {
        return <div className="p-6 text-red-600">{error}</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Projects</h1>
            <h4 className="text-gray-500 mb-6">Add or edit your projects.</h4>

            {/* Add Project Button */}
            <div className="flex justify-center mb-6">
                <Link to="/freelancerprofile/addprojects" className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-secondary hover:text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <span>Add Project</span>
                </Link>
            </div>

            {/* Projects List */}
            <div className="flex flex-col gap-6">
                {projects.length === 0 ? (
                    <p>No projects found. Start by adding a new project!</p>
                ) : (
                    projects.map((item) => (
                        <div key={item.id} className="flex flex-col md:flex-row bg-white border rounded-lg shadow-lg p-4 gap-4">
                            {/* Project Image */}
                            <div className="w-full md:w-1/3 flex justify-center items-center">
                                <img
                                    src={item.thumbnailUrl || "/default-project.png"}
                                    alt="Project Preview"
                                    className="w-full h-auto rounded-lg object-cover"
                                />
                            </div>

                            {/* Project Details */}
                            <div className="w-full md:w-2/3 flex flex-col justify-between">
                                <div>
                                    <p className="mb-2">
                                        <strong>Title: </strong>{item.title}
                                    </p>
                                    <p className="mb-2">
                                        <strong>Description: </strong>{item.description}
                                    </p>
                                    <p className="mb-2">
                                        <strong>Tools: </strong>
                                        {item.tools?.map((toolObj) => toolObj.tool).join(", ") || "N/A"}
                                    </p>
                                    <p className=" font-bold">
                                        <strong>Project Url: </strong>{item.projectUrl || 'N/A'}
                                    </p>
                                </div>

                                {/* Edit/Delete Buttons */}
                                <div className="flex gap-4 mt-4">
                                    <Link
                                        to={`/freelancerprofile/editproject/${item.id}`}
                                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default FreelancerProjects;
