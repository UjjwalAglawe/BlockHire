import React from 'react';
import { useForm } from 'react-hook-form';

const Page2PersonalInfo = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="w-auto h-screen mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary"><strong>Personal info</strong></h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center">
          <label htmlFor="fullName" className="block font-medium w-1/3">Full Name</label>
          <input
            type="text"
            id="fullName"
            {...register("fullName", { required: "Full name is required" })}
            className="w-full border my-2 py-2 px-3 rounded-2xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
          />
        </div>
        {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}

        <div className="flex items-center">
          <label htmlFor="accountAddress" className="block font-medium w-1/3">Account Address</label>
          <input
            type="text"
            id="accountAddress"
            {...register("accountAddress", { required: "Display name is required" })}
            className="w-full border my-2 py-2 px-3 rounded-2xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
          />
        </div>
        {errors.displayName && <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>}

        <div className="flex items-center">
          <label htmlFor="profilePicture" className="block font-medium w-1/3">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            {...register("profilePicture")}
            className="w-full border my-2 py-2 px-3 rounded-2xl text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition duration-200"
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="coverImage" className="block font-medium w-1/3">Cover Image</label>
          <input
            type="file"
            id="coverImage"
            {...register("coverImage")}
            className="w-full border my-2 py-2 px-3 rounded-2xl text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition duration-200"
          />
        </div>

        <div className="flex items-center">
          <label htmlFor="description" className="block font-medium w-1/3">Description</label>
          <textarea
            id="description"
            {...register("description", { required: "Description is required", minLength: { value: 50, message: "Description must be at least 150 characters" } })}
            rows="4"
            className="w-full border my-2 py-2 px-3 rounded-2xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
            placeholder="Share a bit about your work experience, cool projects you've completed, and your area of expertise."
          ></textarea>
        </div>
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        <p className="mt-2 text-sm text-gray-500">min. 50 characters</p>

        <div className="flex items-center">
          <label htmlFor="language" className="block font-medium w-1/3">Language</label>
          <select
            id="language"
            {...register("language", { required: "Language is required" })}
            className="w-full border my-2 py-2 px-3 rounded-2xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
          >
            <option value="">Select a language</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
          
          </select>
        </div>
        {errors.language && <p className="mt-1 text-sm text-red-600">{errors.language.message}</p>}

        <div className="flex items-center">
          <label htmlFor="languageLevel" className="block font-medium w-1/3">Language Level</label>
          <select
            id="languageLevel"
            {...register("languageLevel", { required: "Language level is required" })}
            className="w-full border my-2 py-2 px-3 rounded-2xl focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-200"
          >
            <option value="">Select a level</option>
            <option value="basic">Basic</option>
            <option value="conversational">Conversational</option>
            <option value="fluent">Fluent</option>
            <option value="native">Native/Bilingual</option>
          </select>
        </div>
        {errors.languageLevel && <p className="mt-1 text-sm text-red-600">{errors.languageLevel.message}</p>}

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

export default Page2PersonalInfo;
