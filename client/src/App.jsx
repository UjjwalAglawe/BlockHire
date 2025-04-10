import { useState ,useEffect} from 'react';
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
import { initializeContract } from './Components/Contract/initialize.js';
import CreateContract from './Components/Contract/CreateContract.jsx';
import Chatting from './Components/Chat/Chatting.jsx';
import Allchat from './Components/Chat/Allchat.jsx';

function App() {
    // Regular User Example

    const [contract, setContract] = useState(null);

    useEffect(() => {
        const loadContract = async () => {
          try {
            const instance = await initializeContract();
            setContract(instance);
          } catch (error) {
            console.error("Error initializing contract:", error);
          }
        };
        loadContract();
      }, []);

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='about' element={<AboutUs />} />
                <Route path='freelancers' element={<FreelancerCard />} />
                <Route path='userprofile' element={<Profile contract={contract}/>} />
                <Route path='allchats' element={<Allchat />} />

                {/* CHANGE ACCORDING TO FREELANCER CURRENTLY STATIC */}
                <Route path='freelancerprofile' element={<FreelancerProfile />} />
                <Route path='freelancerwork/:id' element={<FreelancerWork />} />
                <Route path='sidebar' element={<Sidebar />} />
                {/* <Route path='dashboard' element={<FreelancerDashboard />} /> */}
            </Route>

            {/* SliderLayout Routes */}
            <Route path="/freelancerprofile" element={<SliderLayout />}>
                <Route path='' index element={<FreelancerDashboard />} />
                <Route path='projects' element={<FreelancerProjects />} />
                <Route path='editprofile' element={<EditProfile />} />
                <Route path='addprojects' element={<FreelancerAddProjects />} />
                <Route path='allchats' element={<Allchat />} />
                <Route path='contract' element={<ContractPage contract={contract} />} />
            </Route>
            
            <Route path="/deal" element={<SliderLayout />}>
                <Route path='create' index element={<CreateContract contract={contract}/>} />
            </Route>

            <Route path='signin' element={<SignInPage />} />
            <Route path='freelancerRegister/:id' element={<FreelancerRegister />} />
            <Route path='signup' element={<SignUpPage />} />
            <Route path='chat/:id' element={<Chatting />} />
        </Routes>
    );
}

export default App;
