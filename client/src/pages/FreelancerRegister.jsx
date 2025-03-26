// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { registerFreelancerStart, registerFreelancerSuccess, registerFreelancerFailure } from "../reducer/user/freelancerSlice";
// import { signInSuccess } from "../reducer/user/userSlice";
// import uploadToPinata from "../uploadImg";

// const FreelancerSignUp = () => {
//     const [formData, setFormData] = useState({
//         title: "",
//         bio: "",
//         expectations: [],
//         education: "",
//         experience: "",
//         portfolio_url: "",
//         hourly_rate: "",
//         metamask_address: "",
//         photoUrl: "",
//         skills: [],
//         languages: [],
//         country: "",
//     });

//     const [profileImage, setProfileImage] = useState(null);

//     const [expectations, setExpectations] = useState([]);
//     const [expectationInput, setExpectationInput] = useState("");

//     const [languages, setLanguages] = useState([]);
//     const [languageInput, setLanguageInput] = useState("");


//       const handleFileChange = async (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = async () => {
//                 // Upload image to Pinata
//                 const ipfsUrl = await uploadToPinata(file);
//                 if (ipfsUrl) {
//                     setFormData((prev) => ({ ...prev, photoUrl: ipfsUrl }));
//                 } else {
//                     console.error("Failed to upload image to IPFS.");
//                 }
//             };
//             reader.readAsDataURL(file);
//             setProfileImage(file);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleExpectationAdd = () => {
//         if (expectationInput.trim() && !expectations.includes(expectationInput.trim())) {
//             const updatedExpectations = [...expectations, expectationInput.trim()];
//             setExpectations(updatedExpectations);
//             setFormData((prev) => ({ ...prev, expectations: updatedExpectations }));
//             setExpectationInput("");
//         }
//     };

//     const handleExpectationRemove = (expectationToRemove) => {
//         const updatedExpectations = expectations.filter(exp => exp !== expectationToRemove);
//         setExpectations(updatedExpectations);
//         setFormData((prev) => ({ ...prev, expectations: updatedExpectations }));
//     };

//     // Handle Adding & Removing Languages
//     const handleLanguageAdd = () => {
//         if (languageInput.trim() && !languages.includes(languageInput.trim())) {
//             const updatedLanguages = [...languages, languageInput.trim()];
//             setLanguages(updatedLanguages);
//             setFormData((prev) => ({ ...prev, languages: updatedLanguages }));
//             setLanguageInput("");
//         }
//     };

//     const handleLanguageRemove = (languageToRemove) => {
//         const updatedLanguages = languages.filter(lang => lang !== languageToRemove);
//         setLanguages(updatedLanguages);
//         setFormData((prev) => ({ ...prev, languages: updatedLanguages }));
//     };

//     const navigate = useNavigate();
//     const { id } = useParams();
//     const [skills, setSkills] = useState([]);
//     const [skillInput, setSkillInput] = useState("");
//     const dispatch = useDispatch()

//     const handleSkillAdd = () => {
//         if (skillInput.trim() && !skills.includes(skillInput.trim())) {
//             const updatedSkills = [...skills, skillInput.trim()];
//             setSkills(updatedSkills);
//             setFormData((prev) => ({ ...prev, skills: updatedSkills }));
//             setSkillInput("");
//         }
//     };

//     const handleSkillRemove = (skillToRemove) => {
//         const updatedSkills = skills.filter(skill => skill !== skillToRemove);
//         setSkills(updatedSkills);
//         setFormData((prev) => ({ ...prev, skills: updatedSkills }));
//     };

//     const onSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             dispatch(registerFreelancerStart());

//             const payload = {
//                 title: formData.title,
//                 bio: formData.bio,
//                 expectations: formData.expectations,
//                 education: formData.education,
//                 experience: formData.experience,
//                 portfolioUrl: formData.portfolio_url,
//                 hourlyRate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : 0,
//                 metamaskAddress: formData.metamask_address,
//                 photoUrl: formData.photoUrl,
//                 skills: skills,
//                 languages: languages,
//                 country: formData.country,
//             };

//             console.log("Payload being sent: ", payload);
//             const res = await axios.post(`/api/register/${id}`, payload, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             console.log("Response from server: ", res.data);

//             dispatch(signInSuccess(res.data.data));

//             if (res.data.data.isFreelancer && res.data.data.freelancer) {
//                 dispatch(registerFreelancerSuccess(res.data.data.freelancer));
//             }

//             dispatch(registerFreelancerSuccess(res.data.data));
//             navigate("/");
//         } catch (error) {
//             console.error("Error creating freelancer profile:", error);
//             if (error.response) {
//                 console.error("Error response data:", error.response.data);
//                 dispatch(registerFreelancerFailure(error.response.data.message || "Failed to create freelancer profile"));
//             } else {
//                 dispatch(registerFreelancerFailure(error.message));
//             }
//         }
//     };


//     return (
//         <form
//             onSubmit={onSubmit}
//             className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto"
//         >
//             <h1 className="text-3xl font-extrabold text-center text-primary mb-6">BlockHire</h1>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Freelancer Sign Up</h2>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium">Title</label>
//                 <select
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                     <option value="">Select your title</option>
//                     {[
//                         "Web Development", "Mobile App Development", "Frontend Development",
//                         "Backend Development", "Full-Stack Development", "Blockchain Development",
//                         "Game Development", "DevOps & Cloud Infrastructure", "Data Science & Machine Learning",
//                         "AI Development", "Cybersecurity", "Embedded Systems", "UI/UX Design"
//                     ].map((option) => (
//                         <option key={option} value={option}>{option}</option>
//                     ))}
//                 </select>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium">Profile Image</label>
//                 <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 {formData.photoUrl && (
//                     <img src={formData.photoUrl} alt="Profile Preview" className="mt-2 w-24 h-24 rounded-full object-cover" />
//                 )}
//             </div>

//             {[
//                 { label: "Bio", field: "bio", type: "textarea" },
//                 { label: "Education", field: "education", type: "text" },
//                 { label: "Experience", field: "experience", type: "text" },
//                 { label: "Portfolio URL", field: "portfolio_url", type: "text" },
//                 { label: "Hourly Rate ($)", field: "hourly_rate", type: "number" },
//                 { label: "MetaMask Address", field: "metamask_address", type: "text" },
//                 { label: "Country", field: "country", type: "text" },
//             ].map(({ label, field, type }) => (
//                 <div className="mb-4" key={field}>
//                     <label className="block text-gray-700 font-medium">{label}</label>
//                     {type === "textarea" ? (
//                         <textarea
//                             name={field}
//                             value={formData[field]}
//                             onChange={handleChange}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder={`Enter your ${label.toLowerCase()}`}
//                             rows="3"
//                         />
//                     ) : (
//                         <input
//                             name={field}
//                             value={formData[field]}
//                             onChange={handleChange}
//                             type={type}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             placeholder={`Enter your ${label.toLowerCase()}`}
//                         />
//                     )}
//                 </div>
//             ))}

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium">Skills</label>
//                 <div className="flex items-center space-x-2">
//                     <input
//                         type="text"
//                         value={skillInput}
//                         onChange={(e) => setSkillInput(e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter a skill and press Add"
//                     />
//                     <button
//                         type="button"
//                         onClick={handleSkillAdd}
//                         className="bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600"
//                     >
//                         Add
//                     </button>
//                 </div>

//                 <div className="mt-2 flex flex-wrap gap-2">
//                     {skills.map((skill, index) => (
//                         <span key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                             {skill}
//                             <button
//                                 type="button"
//                                 onClick={() => handleSkillRemove(skill)}
//                                 className="ml-2 text-red-500 hover:text-red-700"
//                             >
//                                 ×
//                             </button>
//                         </span>
//                     ))}
//                 </div>
//             </div>


//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium">Expectations</label>
//                 <div className="flex items-center space-x-2">
//                     <input
//                         type="text"
//                         value={expectationInput}
//                         onChange={(e) => setExpectationInput(e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter a skill and press Add"
//                     />
//                     <button
//                         type="button"
//                         onClick={handleExpectationAdd}
//                         className="bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600"
//                     >
//                         Add
//                     </button>
//                 </div>

//                 <div className="mt-2 flex flex-wrap gap-2">
//                     {expectations.map((expectation, index) => (
//                         <span key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                             {expectation}
//                             <button
//                                 type="button"
//                                 onClick={() => handleExpectationRemove(expectation)}
//                                 className="ml-2 text-red-500 hover:text-red-700"
//                             >
//                                 ×
//                             </button>
//                         </span>
//                     ))}
//                 </div>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium">Language</label>
//                 <div className="flex items-center space-x-2">
//                     <input
//                         type="text"
//                         value={languageInput}
//                         onChange={(e) => setLanguageInput(e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter a skill and press Add"
//                     />
//                     <button
//                         type="button"
//                         onClick={handleLanguageAdd}
//                         className="bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600"
//                     >
//                         Add
//                     </button>
//                 </div>

//                 <div className="mt-2 flex flex-wrap gap-2">
//                     {languages.map((language, index) => (
//                         <span key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                             {language}
//                             <button
//                                 type="button"
//                                 onClick={() => handleLanguageRemove(language)}
//                                 className="ml-2 text-red-500 hover:text-red-700"
//                             >
//                                 ×
//                             </button>
//                         </span>
//                     ))}
//                 </div>
//             </div>

//             <button
//                 type="submit"
//                 className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//                 Sign Up
//             </button>
//         </form>
//     );
// };

// export default FreelancerSignUp;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
    registerFreelancerStart,
    registerFreelancerSuccess,
    registerFreelancerFailure
} from "../reducer/user/freelancerSlice";
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
        photoUrl: "",
        skills: [],
        languages: [],
        country: "",
    });

    const [profileImage, setProfileImage] = useState(null);
    const [expectations, setExpectations] = useState([]);
    const [expectationInput, setExpectationInput] = useState("");
    const [languages, setLanguages] = useState([]);
    const [languageInput, setLanguageInput] = useState("");
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");

    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const ipfsUrl = await uploadToPinata(file);
                if (ipfsUrl) {
                    setFormData((prev) => ({ ...prev, photoUrl: ipfsUrl }));
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

    const handleAdd = (input, setInput, list, setList, field) => {
        if (input.trim() && !list.includes(input.trim())) {
            const updatedList = [...list, input.trim()];
            setList(updatedList);
            setFormData((prev) => ({ ...prev, [field]: updatedList }));
            setInput("");
        }
    };

    const handleRemove = (itemToRemove, list, setList, field) => {
        const updatedList = list.filter(item => item !== itemToRemove);
        setList(updatedList);
        setFormData((prev) => ({ ...prev, [field]: updatedList }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(registerFreelancerStart());

            const payload = {
                ...formData,
                hourlyRate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : 0,
                skills,
                languages
            };

            const res = await axios.post(`/api/register/${id}`, payload, {
                headers: { "Content-Type": "application/json" }
            });

            dispatch(signInSuccess(res.data.data));

            if (res.data.data.isFreelancer && res.data.data.freelancer) {
                dispatch(registerFreelancerSuccess(res.data.data.freelancer));
            }

            dispatch(registerFreelancerSuccess(res.data.data));
            navigate("/");
        } catch (error) {
            console.error("Error creating freelancer profile:", error);
            dispatch(registerFreelancerFailure(error.response?.data?.message || "Failed to create freelancer profile"));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <form
                onSubmit={onSubmit}
                className="w-full max-w-8xl bg-white rounded-xl shadow-2xl p-8 border border-blue-100 transform transition-all duration-300 hover:shadow-3xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary mb-2">BlockHire</h1>
                    <h2 className="text-2xl underline font-extrabold text-gray-800">Freelancer Sign Up</h2>
                </div>

                <div className="flex flex-col gap-6">
                    <div className='text-primary font-bold text-xl text-center '>
                        Sign up as a freelancer to showcase your skills, connect with clients, and get paid securely through smart contracts !!!!!
                    </div>


                    <div className="flex flex-col w-full mb-2">
                        <label className="text-xl font-medium text-gray-700 mb-2">Title :</label>
                        <div className='text-gray-400 m-1'>Select the profession you will offer to clients</div>
                        <select
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 text-gray-800 transition duration-300"
                        >
                            <option value="">Select your title</option>
                            {[
                                "Web Development", "Mobile App Development", "Frontend Development",
                                "Backend Development", "Full-Stack Development", "Blockchain Development",
                                "Game Development", "DevOps & Cloud Infrastructure", "Data Science & ML",
                                "AI Development", "Cybersecurity", "Embedded Systems", "UI/UX Design"
                            ].map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>


                    <div className="flex flex-col w-full mb-2">
                        <label className="text-xl font-medium text-gray-700 mb-2">Profile Image :</label>
                        <div className='text-gray-400 m-1'>Add your profile pic to display to other clients.</div>

                        <div className="relative w-32 h-32">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="opacity-0 absolute w-full h-full cursor-pointer"
                            />
                            <div className="w-32 h-32 rounded-full border-2 ml-8 border-blue-400 flex items-center justify-center bg-blue-400 hover:bg-primary text-white text-center transition-all">
                                Add File
                            </div>
                        </div>

                        {formData.photoUrl && (
                            <img
                                src={formData.photoUrl}
                                alt="Profile"
                                className="mt-4 w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-md"
                            />
                        )}
                    </div>

                </div>
                {[
    { label: "Bio", field: "bio", type: "textarea", info: "Tell about yourself." },
    { label: "Education", field: "education", type: "text", info: "What is your specialization?" },
    { label: "Experience", field: "experience", type: "text", info: "Experience in months or years." },
    { label: "Portfolio URL", field: "portfolio_url", type: "text", info: "Share your portfolio URL to help clients learn more about you." },
    { label: "Hourly Rate ($)", field: "hourly_rate", type: "number", info: "Your hourly charges in USD." },
    { label: "MetaMask Address", field: "metamask_address", type: "text", info: "Add your MetaMask address to connect with clients and receive payments securely." },
    { label: "Country", field: "country", type: "text", info: "Add the name of your country." }
].map(({ label, field, type, info }) => (
    <div className="my-4 w-full mb-2" key={field}>
        <label className="text-lg mb-2 font-medium text-gray-700">{label} :</label>
        <div className='text-gray-400 m-1'>{info}</div>
        
        {type === "textarea" ? (
            <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="w-full p-3 my-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 text-gray-800 transition duration-300"
                rows="3"
            />
        ) : (
            <input
                name={field}
                value={formData[field]}
                onChange={handleChange}
                type={type}
                placeholder={`Enter your ${label.toLowerCase()}`}
                className="w-full p-3 my-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 text-gray-800 transition duration-300"
            />
        )}
    </div>
))}


{[
    { 
        label: "Skills", 
        list: skills, 
        setList: setSkills, 
        input: skillInput, 
        setInput: setSkillInput, 
        field: "skills", 
        placeholder: "Add a skill (e.g., React, Python)",
        info: "Add the technical and soft skills you are proficient in."
    },
    { 
        label: "Languages", 
        list: languages, 
        setList: setLanguages, 
        input: languageInput, 
        setInput: setLanguageInput, 
        field: "languages", 
        placeholder: "Add a language (e.g., English, Hindi)",
        info: "List the languages you can communicate in fluently."
    },
    { 
        label: "Expectations", 
        list: expectations, 
        setList: setExpectations, 
        input: expectationInput, 
        setInput: setExpectationInput, 
        field: "expectations", 
        placeholder: "Add an expectation in points (e.g., Remote work, Flexible hours)",
        info: "Mention your job expectations like remote work, flexible hours, etc."
    }
].map(({ label, list, setList, input, setInput, field, placeholder, info }) => (
    <div className="my-2 w-full" key={field}>
        <label className="text-lg font-medium text-gray-700 mb-2">{label} :</label>
        
        {/* Info description */}
        <div className="text-gray-400 m-1">{info}</div>
        
        <div className="flex items-center space-x-2 w-full">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                className="w-full my-2 p-3 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-blue-50 text-gray-800 transition duration-300"
            />
            <button
                type="button"
                onClick={() => handleAdd(input, setInput, list, setList, field)}
                className="bg-gradient-to-r from-blue-400 to-primary text-white px-4 py-3 rounded-md hover:from-blue-600 hover:to-blue-800 transition duration-300"
            >
                Add
            </button>
        </div>

        {list.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
                {list.map((item) => (
                    <span
                        key={item}
                        className="bg-blue-100 mb-3 text-black font-semibold border-2 px-1 py-1 rounded-md text-sm flex items-center"
                    >
                        {item}
                        <button
                            type="button"
                            onClick={() => handleRemove(item, list, setList, field)}
                            className="ml-2 text-red-500 hover:text-red-700"
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>
        )}
    </div>
))}

                <button
                    type="submit"
                    className="mt-6 w-full py-3 px-6 bg-primary text-white rounded-md hover:from-blue-700 hover:to-gray-900 transition duration-300 transform hover:scale-105 shadow-lg"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default FreelancerSignUp;