import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceHeader from "../ServiceHeader/ServiceHeader";

function FreelancerCard() {
    const [freelancers, setFreelancers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchFreelancers = async () => {
            try {
                setLoading(true);
                const response = await fetch(`api/freelancers?page=1&limit=10`);

                console.log("Response received:", response);  // Debugging log

                const text = await response.text();  // Read response as text
                console.log("Raw Response Text:", text);  // Log raw response

                const data = JSON.parse(text); // Convert text to JSON

                if (data.success) {
                    setFreelancers(data.data);
                    setTotalPages(data.pagination.totalPages);
                } else {
                    throw new Error(data.message || "Failed to fetch freelancers");
                }
            } catch (error) {
                console.error("Error fetching freelancers:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };




        fetchFreelancers();
    }, [page]);

    return (
        <div>
            <ServiceHeader />

            {/* Loading State */}
            {loading && <p className="text-center text-gray-600">Loading freelancers...</p>}

            {/* Error State */}
            {error && <p className="text-center text-red-500">Error: {error}</p>}

            {/* Freelancer Cards */}
            <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-100">
                {freelancers.map((freelancer) => (
                    <Link
                        to={`/freelancerwork/${freelancer.id}`}  // ✅ Pass the freelancer ID dynamically
                        key={freelancer.id}
                        className="motion-preset-expand flex flex-col cursor-pointer bg-white rounded-lg shadow-lg border border-gray-200 w-72 hover:scale-105 transition duration-200 hover:shadow-lg hover:shadow-blue-200"
                    >
                        {/* Project Image (Placeholder if not available) */}
                        <div>
                            <img
                                src={freelancer.photoUrl || "/ProjectImages/default.png"}
                                alt="Project"
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                        </div>

                        {/* Profile and Name */}
                        <div className="flex items-center gap-4 p-4 border-b border-gray-200">
                            <img
                                src={freelancer.photoUrl || "/ProfileImages/default-profile.jpg"}
                                alt="Profile"
                                className="w-12 h-12 rounded-full"
                            />
                            <Link to={`/freelancerprofile/${freelancer.id}`} className="text-lg font-semibold text-gray-700 hover:underline">
                                {freelancer.name}
                            </Link>
                        </div>

                        {/* Skills */}
                        <div className="p-4 text-gray-600">
                            <strong>Skills:</strong> {freelancer.skills.join(", ")}
                        </div>

                        {/* Bio */}
                        <div className="p-4 text-gray-600">{freelancer.bio}</div>

                        {/* Hourly Rate */}
                        <div className="p-4 border-t border-gray-200 text-gray-700 font-semibold">
                            {freelancer.hourlyRate ? `Starting at $${freelancer.hourlyRate}/hr` : "Rate not available"}
                        </div>
                    </Link>
                ))}

            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-4 p-6">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-700">Page {page} of {totalPages}</span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default FreelancerCard;
