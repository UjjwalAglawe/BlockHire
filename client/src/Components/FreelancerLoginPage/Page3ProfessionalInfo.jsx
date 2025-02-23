import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const Page3ProfessionalInfo = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [certificates, setCertificates] = useState([]);
  const [certificateInput, setCertificateInput] = useState('');

  const onSubmit = (data) => {
    console.log({ ...data, skills, certificates });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleAddCertificate = () => {
    if (certificateInput.trim() && !certificates.includes(certificateInput.trim())) {
      setCertificates([...certificates, certificateInput.trim()]);
      setCertificateInput('');
    }
  };

  const handleRemoveCertificate = (certificateToRemove) => {
    setCertificates(certificates.filter(certificate => certificate !== certificateToRemove));
  };

  return (
    <div className="w-auto h-screen mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary"><strong>Professional Info</strong></h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Occupation Input */}
        <div className="flex items-center">
          <label htmlFor="occupation" className="block font-medium w-1/3">Occupation</label>
          <input
            type="text"
            id="occupation"
            {...register("occupation", { required: "Occupation is required" })}
            className="w-full border my-2 py-2 px-3 rounded-2xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
          />
        </div>
        {errors.occupation && <p className="mt-1 text-sm text-red-600">{errors.occupation.message}</p>}

        {/* Skills Input */}
        <div className="flex items-center">
          <label htmlFor="skills" className="block font-medium w-1/3">Skills</label>
          <div className="flex w-full">
            <input
              type="text"
              id="skills"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="w-4/5 border my-2 py-2 px-3 rounded-2xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
              placeholder="Type a skill and click add"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="ml-2 bg-indigo-600 text-white py-2 px-4 rounded-2xl hover:bg-indigo-700 transition duration-200"
            >
              Add
            </button>
          </div>
        </div>

        <ul className="mt-2">
          {skills.map((skill, index) => (
            <li key={index} className="flex justify-between items-center border-b py-1">
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Certification Name Input */}
        <div className="flex items-center">
          <label htmlFor="certificates" className="block font-medium w-1/3">Certification Name</label>
          <div className="flex w-full">
            <input
              type="text"
              id="certificates"
              value={certificateInput}
              onChange={(e) => setCertificateInput(e.target.value)}
              className="w-4/5 border my-2 py-2 px-3 rounded-2xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
              placeholder="Type a certification name and click add"
            />
            <button
              type="button"
              onClick={handleAddCertificate}
              className="ml-2 bg-indigo-600 text-white py-2 px-4 rounded-2xl hover:bg-indigo-700 transition duration-200"
            >
              Add
            </button>
          </div>
        </div>

        <ul className="mt-2">
          {certificates.map((certificate, index) => (
            <li key={index} className="flex justify-between items-center border-b py-1">
              <span>{certificate}</span>
              <button
                type="button"
                onClick={() => handleRemoveCertificate(certificate)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Education Fields */}
        <div className="flex items-center">
          <label htmlFor="universityName" className="block font-medium w-1/3">University Name</label>
          <input
            type="text"
            id="universityName"
            {...register("universityName", { required: "University name is required" })}
            className="w-full border my-2 py-2 px-3 rounded-2xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
          />
        </div>
        {errors.universityName && <p className="mt-1 text-sm text-red-600">{errors.universityName.message}</p>}

        <div className="flex items-center">
          <label htmlFor="country" className="block font-medium w-1/3">Country</label>
          <input
            type="text"
            id="country"
            {...register("country", { required: "Country is required" })}
            className="w-full border my-2 py-2 px-3 rounded-2xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
          />
        </div>
        {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>}

        <div className="flex items-center">
          <label htmlFor="state" className="block font-medium w-1/3">State</label>
          <input
            type="text"
            id="state"
            {...register("state", { required: "State is required" })}
            className="w-full border my-2 py-2 px-3 rounded-2xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
          />
        </div>
        {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>}

        <div className="flex items-center">
          <label htmlFor="city" className="block font-medium w-1/3">City</label>
          <input
            type="text"
            id="city"
            {...register("city", { required: "City is required" })}
            className="w-full border my-2 py-2 px-3 rounded-2xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
          />
        </div>
        {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>}

        <div className="flex items-center">
          <label htmlFor="personalWebsite" className="block font-medium w-1/3">Personal Website</label>
          <input
            type="url"
            id="personalWebsite"
            {...register("personalWebsite", { required: "Personal website is required" })}
            className="w-full border my-2 py-2 px-3 rounded-2xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
            placeholder="https://example.com"
          />
        </div>
        {errors.personalWebsite && <p className="mt-1 text-sm text-red-600">{errors.personalWebsite.message}</p>}

        <div className='flex justify-center items-center'>
          <button
            type="submit"
            className="w-[20%] mb-6 hover:bg-yellow-600 hover:shadow-lg bg-primary  flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm  font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page3ProfessionalInfo;
