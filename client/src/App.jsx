import { useState } from 'react';
import { Route, Routes } from "react-router-dom";

import Layout from './Layout.jsx';
import SliderLayout from './SliderLayout.jsx';

// Components
import FreelancerCard from './Components/Freelancer_ProfilePage/FreelancerCard.jsx';
import Home from './Components/Home/Home.jsx';
import AboutUs from './Components/Home/AboutUs.jsx';
import FreelancerProfile from './Components/Freelancer_ProfilePage/FreelancerProfile.jsx';
import FreelancerWork from './Components/Freelancer_ProfilePage/FreelancerWork.jsx';
import FreelancerProjects from './Components/Freelancer_ProfilePage/FreelancerProjects.jsx';
import Sidebar from './Components/Dashboard/Sidebar.jsx';
import FreelancerDashboard from './Components/Dashboard/FreelancerDashboard.jsx';
import EditProfile from './Components/Dashboard/EditProfile.jsx';
import FreelancerAddProjects from './Components/Freelancer_ProfilePage/FreelancerAddProjects.jsx';
import ContractPage from './Components/Dashboard/ContractPage.jsx';
import SignInPage from './pages/SignInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import FreelancerRegister from './pages/FreelancerRegister.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  // Regular User Example
const regularUserData = {
  username: "SarahJones",
  email: "sarah.jones@example.com",
  accountType: "user",
  profilePhoto: "/images/profile/sarah.jpg",
  coverPhoto: null, // No cover photo
  bio: "", // No bio yet
  title: null, // No professional title
  location: "Los Angeles, CA",
  website: null, // No website
  joinDate: "March 2025",
  isOwnProfile: true,
  
  // Minimal activity
  activity: [
    {
      id: "act1",
      description: "Hired Alex Chen for website redesign",
      date: "2 days ago"
    },
    {
      id: "act2",
      description: "Left a review for Emma Wilson",
      date: "1 week ago"
    }
  ],
  
  // Fields that only freelancers would have
  skills: null,
  projects: null,
  experience: null,
  education: null,
  availability: null
};

// Freelancer Example
const freelancerData = {
  username: "AlexChen",
  email: "alex.chen@example.com",
  accountType: "freelancer",
  profilePhoto: "/images/profile/alex.jpg",
  coverPhoto: "/images/covers/design-cover.jpg",
  bio: "UI/UX designer with 7+ years of experience creating intuitive interfaces for web and mobile applications. Passionate about accessible design and user-centered approaches.",
  title: "Senior UI/UX Designer",
  location: "San Francisco, CA",
  website: "https://alexchen.design",
  joinDate: "January 2024",
  isOwnProfile: false,
  
  // No activity feed for freelancers
  activity: null,
  
  // Freelancer-specific fields
  skills: ["UI Design", "UX Research", "Figma", "Adobe XD", "Prototyping", "User Testing", "Accessibility"],
  
  projects: [
    {
      id: "proj1",
      title: "Finance App Redesign",
      description: "Complete overhaul of a personal finance application focusing on improved data visualization and accessibility.",
      imageUrl: "/images/projects/finance-app.jpg"
    },
    {
      id: "proj2",
      title: "E-commerce Website",
      description: "Designed a responsive e-commerce platform with an emphasis on streamlined checkout process and product discovery.",
      imageUrl: "/images/projects/ecommerce.jpg"
    },
    {
      id: "proj3",
      title: "Healthcare Patient Portal",
      description: "Created an intuitive interface for patients to access medical records, schedule appointments, and communicate with healthcare providers.",
      imageUrl: "/images/projects/healthcare.jpg"
    }
  ],
  
  experience: [
    {
      id: "exp1",
      position: "Senior UI/UX Designer",
      company: "TechCorp Inc.",
      duration: "2021 - Present",
      description: "Lead designer for the company's flagship product, managing a team of 3 junior designers."
    },
    {
      id: "exp2",
      position: "UI Designer",
      company: "Creative Solutions",
      duration: "2018 - 2021",
      description: "Designed interfaces for various client projects across multiple industries."
    },
    {
      id: "exp3",
      position: "Graphic Designer",
      company: "Marketing Minds",
      duration: "2016 - 2018",
      description: "Created visual assets for digital marketing campaigns."
    }
  ],
  
  education: [
    {
      id: "edu1",
      degree: "MFA in Interaction Design",
      institution: "California College of Arts",
      year: "2016"
    },
    {
      id: "edu2",
      degree: "BA in Graphic Design",
      institution: "University of Washington",
      year: "2014"
    }
  ],
  
  availability: "Available for projects starting May 2025"
};
  return (
    <Routes>  
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />  
        <Route path='about' element={<AboutUs />} />
        <Route path='freelancers' element={<FreelancerCard />} />
        <Route path='userprofile'   element={<Profile  userData={regularUserData}/>} />
        
        {/* CHANGE ACCORDING TO FREELANCER CURRENTLY STATIC */}
        <Route path='freelancerprofile' element={<FreelancerProfile />} />
        <Route path='freelancerwork' element={<FreelancerWork />} />
        <Route path='sidebar' element={<Sidebar />} />
        {/* <Route path='dashboard' element={<FreelancerDashboard />} /> */}
      </Route>

      {/* SliderLayout Routes */}
      <Route path="/profile" element={<SliderLayout />}>
        <Route index element={<FreelancerDashboard />} />
        <Route path='projects' element={<FreelancerProjects />} />
        <Route path='editprofile' element={<EditProfile />} />
        <Route path='addprojects' element={<FreelancerAddProjects />} />
        <Route path='contract' element={<ContractPage />} />
      </Route>

      <Route path='signin' element={<SignInPage/>}/>
      <Route path='freelancerRegister' element={<FreelancerRegister />} />
      <Route path='signup' element={<SignUpPage/>} />
    </Routes>
  );
}

export default App;
