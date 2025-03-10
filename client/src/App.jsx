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

function App() {

  return (
    <Routes>  {/* ✅ Wrap all <Route> inside <Routes> */}
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />  {/* ✅ Use index for default home route */}
        <Route path='about' element={<AboutUs />} />
        <Route path='freelancers' element={<FreelancerCard />} />
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

      <Route path='login' element={<SignInPage/>}/>
      <Route path='freelancerRegister' element={<FreelancerRegister />} />
      <Route path='signup' element={<SignUpPage/>} />
    </Routes>
  );
}

export default App;
