import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FreelancerSignUp = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            bio: "",
            education: "",
            experience: "",
            portfolio_url: "",
            hourly_rate: "",
            metamask_address: "",
            skills: []
        },
    });

    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");

    // Function to add a skill
    const handleSkillAdd = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            const updatedSkills = [...skills, skillInput.trim()];
            setSkills(updatedSkills);
            setValue("skills", updatedSkills); // Update form state
            console.log(skills);
            
            setSkillInput(""); // Clear input
        }
    };

    // Function to remove a skill
    const handleSkillRemove = (skillToRemove) => {
        const updatedSkills = skills.filter(skill => skill !== skillToRemove);
        setSkills(updatedSkills);
        setValue("skills", updatedSkills);
    };

    const onSubmit = (data) => {
        data.skills = skills; // Attach skills array to form data
        console.log("Form Data:", data);
        alert("Freelancer profile created successfully!");
        navigate("/");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto"
        >
            <h1 className="text-3xl font-extrabold text-center text-primary mb-6">BlockHire</h1>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Freelancer Sign Up</h2>

            {/* Title Dropdown */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Title</label>
                <select {...register("title", { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select your title</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Frontend Development">Frontend Development</option>
                    <option value="Backend Development">Backend Development</option>
                    <option value="Full-Stack Development">Full-Stack Development</option>
                    <option value="Blockchain Development">Blockchain Development</option>
                    <option value="Game Development">Game Development</option>
                    <option value="DevOps & Cloud Infrastructure">DevOps & Cloud Infrastructure</option>
                    <option value="Data Science & Machine Learning">Data Science & Machine Learning</option>
                    <option value="AI Development">AI Development</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Embedded Systems">Embedded Systems</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                </select>
                {errors.title && <p className="text-red-500 text-sm">Title is required.</p>}
            </div>

            {/* Bio */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Bio</label>
                <textarea
                    {...register("bio")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell us about yourself"
                    rows="3"
                />
            </div>

            {/* Education, Experience, Portfolio */}
            {["education", "experience", "portfolio_url"].map((field) => (
                <div className="mb-4" key={field}>
                    <label className="block text-gray-700 font-medium">{field.replace("_", " ").toUpperCase()}</label>
                    <input
                        {...register(field)}
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Enter your ${field.replace("_", " ")}`}
                    />
                </div>
            ))}

            {/* Hourly Rate */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">Hourly Rate ($)</label>
                <input
                    {...register("hourly_rate", { required: true, min: 0 })}
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your hourly rate"
                />
                {errors.hourly_rate && <p className="text-red-500 text-sm">Hourly rate must be non-negative.</p>}
            </div>

            {/* Metamask Address */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium">MetaMask Address</label>
                <input
                    {...register("metamask_address")}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your MetaMask wallet address"
                />
            </div>

            {/* Skills Input */}
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

                {/* Skills Display */}
                <div className="mt-2 flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span
                            key={index}
                            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
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

            {/* Submit Button */}
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