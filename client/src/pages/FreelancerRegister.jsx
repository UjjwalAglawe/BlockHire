import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { registerFreelancerStart, registerFreelancerSuccess, registerFreelancerFailure } from "../reducer/user/freelancerSlice";

const FreelancerSignUp = () => {
    const [formData, setFormData] = useState({
        title: "",
        bio: "",
        education: "",
        experience: "",
        portfolio_url: "",
        hourly_rate: "",
        metamask_address: "",
        skills: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const navigate = useNavigate();
    const { id } = useParams();
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const dispatch = useDispatch()

    const handleSkillAdd = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            const updatedSkills = [...skills, skillInput.trim()];
            setSkills(updatedSkills);
            setFormData((prev) => ({ ...prev, skills: updatedSkills }));
            setSkillInput("");
        }
    };

    const handleSkillRemove = (skillToRemove) => {
        const updatedSkills = skills.filter(skill => skill !== skillToRemove);
        setSkills(updatedSkills);
        setFormData((prev) => ({ ...prev, skills: updatedSkills }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {

            dispatch(registerFreelancerStart())

            const payload = {
                title: formData.title,
                bio: formData.bio,
                education: formData.education,
                experience: formData.experience,
                portfolioUrl: formData.portfolio_url,
                hourlyRate: parseFloat(formData.hourly_rate),
                metamaskAddress: formData.metamask_address,
                skills: skills,
            };

            const res = await axios.post(`/api/register/${id}`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(res.data.freealancer);

            if (res.data.success === false) {
                dispatch(registerFreelancerFailure(res.data.message))
                return;
            }

            dispatch(registerFreelancerSuccess(res.data))

            navigate("/");
        } catch (error) {
            console.error("Error creating freelancer profile:", error);
            dispatch(registerFreelancerFailure(error.message))
        }
    };

    return (
        <form
            onSubmit={onSubmit}
            className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto"
        >
            <h1 className="text-3xl font-extrabold text-center text-primary mb-6">BlockHire</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Freelancer Sign Up</h2>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Title</label>
                <select
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select your title</option>
                    {[
                        "Web Development", "Mobile App Development", "Frontend Development",
                        "Backend Development", "Full-Stack Development", "Blockchain Development",
                        "Game Development", "DevOps & Cloud Infrastructure", "Data Science & Machine Learning",
                        "AI Development", "Cybersecurity", "Embedded Systems", "UI/UX Design"
                    ].map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            {[
                { label: "Bio", field: "bio", type: "textarea" },
                { label: "Education", field: "education", type: "text" },
                { label: "Experience", field: "experience", type: "text" },
                { label: "Portfolio URL", field: "portfolio_url", type: "text" },
                { label: "Hourly Rate ($)", field: "hourly_rate", type: "number" },
                { label: "MetaMask Address", field: "metamask_address", type: "text" },
            ].map(({ label, field, type }) => (
                <div className="mb-4" key={field}>
                    <label className="block text-gray-700 font-medium">{label}</label>
                    {type === "textarea" ? (
                        <textarea
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter your ${label.toLowerCase()}`}
                            rows="3"
                        />
                    ) : (
                        <input
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            type={type}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder={`Enter your ${label.toLowerCase()}`}
                        />
                    )}
                </div>
            ))}

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Skills</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter a skill and press Add"
                    />
                    <button
                        type="button"
                        onClick={handleSkillAdd}
                        className="bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600"
                    >
                        Add
                    </button>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {skill}
                            <button
                                type="button"
                                onClick={() => handleSkillRemove(skill)}
                                className="ml-2 text-red-500 hover:text-red-700"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Sign Up
            </button>
        </form>
    );
};

export default FreelancerSignUp;
