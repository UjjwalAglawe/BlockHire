import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { registerFreelancerStart, registerFreelancerSuccess, registerFreelancerFailure } from "../reducer/user/freelancerSlice";
import { signInSuccess } from "../reducer/user/userSlice";
import uploadToPinata from "../uploadImg";

const FreelancerSignUp = () => {
    const [formData, setFormData] = useState({
        title: "",
        bio: "",
        expectations: [],
        education: "",
        experience: "",
        portfolio_url: "",
        hourly_rate: "",
        metamask_address: "",
        profileImg: "",
        skills: [],
        languages: [],
        country: "",
    });

    const [profileImage, setProfileImage] = useState(null);

    const [expectations, setExpectations] = useState([]);
    const [expectationInput, setExpectationInput] = useState("");

    const [languages, setLanguages] = useState([]);
    const [languageInput, setLanguageInput] = useState("");
    

      const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                // Upload image to Pinata
                const ipfsUrl = await uploadToPinata(file);
                if (ipfsUrl) {
                    setFormData((prev) => ({ ...prev, profileImg: ipfsUrl }));
                } else {
                    console.error("Failed to upload image to IPFS.");
                }
            };
            reader.readAsDataURL(file);
            setProfileImage(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleExpectationAdd = () => {
        if (expectationInput.trim() && !expectations.includes(expectationInput.trim())) {
            const updatedExpectations = [...expectations, expectationInput.trim()];
            setExpectations(updatedExpectations);
            setFormData((prev) => ({ ...prev, expectations: updatedExpectations }));
            setExpectationInput("");
        }
    };

    const handleExpectationRemove = (expectationToRemove) => {
        const updatedExpectations = expectations.filter(exp => exp !== expectationToRemove);
        setExpectations(updatedExpectations);
        setFormData((prev) => ({ ...prev, expectations: updatedExpectations }));
    };

    // Handle Adding & Removing Languages
    const handleLanguageAdd = () => {
        if (languageInput.trim() && !languages.includes(languageInput.trim())) {
            const updatedLanguages = [...languages, languageInput.trim()];
            setLanguages(updatedLanguages);
            setFormData((prev) => ({ ...prev, languages: updatedLanguages }));
            setLanguageInput("");
        }
    };

    const handleLanguageRemove = (languageToRemove) => {
        const updatedLanguages = languages.filter(lang => lang !== languageToRemove);
        setLanguages(updatedLanguages);
        setFormData((prev) => ({ ...prev, languages: updatedLanguages }));
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
            dispatch(registerFreelancerStart());

            const payload = {
                title: formData.title,
                bio: formData.bio,
                expectations: formData.expectations,
                education: formData.education,
                experience: formData.experience,
                portfolioUrl: formData.portfolio_url,
                hourlyRate: parseFloat(formData.hourly_rate),
                metamaskAddress: formData.metamask_address,
                profileImg: formData.profileImg,
                skills: skills,
                languages: languages,
                country: formData.country,
            };

            console.log("Payload being sent: ", payload);
            const res = await axios.post(`/api/register/${id}`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Response from server: ", res.data);

            dispatch(signInSuccess(res.data.data));

            if (res.data.data.isFreelancer && res.data.data.freelancer) {
                dispatch(registerFreelancerSuccess(res.data.data.freelancer));
            }

            dispatch(registerFreelancerSuccess(res.data.data));
            navigate("/");
        } catch (error) {
            console.error("Error creating freelancer profile:", error);
            if (error.response) {
                console.error("Error response data:", error.response.data);
                dispatch(registerFreelancerFailure(error.response.data.message || "Failed to create freelancer profile"));
            } else {
                dispatch(registerFreelancerFailure(error.message));
            }
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

            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Profile Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.profileImg && (
                    <img src={formData.profileImg} alt="Profile Preview" className="mt-2 w-24 h-24 rounded-full object-cover" />
                )}
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


            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Expectations</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={expectationInput}
                        onChange={(e) => setExpectationInput(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter a skill and press Add"
                    />
                    <button
                        type="button"
                        onClick={handleExpectationAdd}
                        className="bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600"
                    >
                        Add
                    </button>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                    {expectations.map((expectation, index) => (
                        <span key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {expectation}
                            <button
                                type="button"
                                onClick={() => handleExpectationRemove(expectation)}
                                className="ml-2 text-red-500 hover:text-red-700"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>
            
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Language</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={languageInput}
                        onChange={(e) => setLanguageInput(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter a skill and press Add"
                    />
                    <button
                        type="button"
                        onClick={handleLanguageAdd}
                        className="bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600"
                    >
                        Add
                    </button>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                    {languages.map((language, index) => (
                        <span key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {language}
                            <button
                                type="button"
                                onClick={() => handleLanguageRemove(language)}
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
