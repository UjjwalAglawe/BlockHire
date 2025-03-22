import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import App from './App.jsx'
import './index.css'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import SliderLayout from './SliderLayout.jsx'


// import FreelancerCard from './Components/Freelancer_ProfilePage/FreelancerCard.jsx'
// import Home from './Components/Home/Home.jsx'
// import AboutUs from './Components/Home/AboutUs.jsx'
// import FreelancerProfile from './Components/Freelancer_ProfilePage/FreelancerProfile.jsx'
// import FreelancerWork from './Components/Freelancer_ProfilePage/FreelancerWork.jsx'
// import FreelancerProjects from './Components/Freelancer_ProfilePage/FreelancerProjects.jsx'
// import Sidebar from './Components/Dashboard/Sidebar.jsx'
// import FreelancerDashboard from './Components/Dashboard/FreelancerDashboard.jsx'
// import EditProfile from './Components/Dashboard/EditProfile.jsx'
// import SignUp from './pages/SignUp.jsx'
// import ClientFreelancerSelectionPage from './Components/ClientFreelancerSelectionPage/ClientFreelancerSelectionPage.jsx'
// import FreelancerAddProjects from './Components/Freelancer_ProfilePage/FreelancerAddProjects.jsx'
// import ContractPage from './Components/Dashboard/ContractPage.jsx'


import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from './reducer/store.js'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path='/' element={<Layout />}>
//         <Route path='' element={<Home />} />
//         <Route path='about' element={<AboutUs />} />
//         <Route path='freelancers' element={<FreelancerCard />} />
//         <Route path='freelancerprofile' element={<FreelancerProfile />} />
//         <Route path='freelancerwork' element={<FreelancerWork />} />
//         <Route path='sidebar' element={<Sidebar />} />
//         {/* <Route path='dashboard' element={<FreelancerDashboard/>}/> */}
//       </Route>

//       {/* SliderLayout Routes */}
//       <Route path="/profile" element={<SliderLayout />}>
//         <Route path='' element={<FreelancerDashboard />} />
//         <Route path='projects' element={<FreelancerProjects />} />
//         <Route path='editprofile' element={<EditProfile />} />
//         <Route path='addprojects' element={<FreelancerAddProjects />} />
//         <Route path='contract' element={<ContractPage />} />
//       </Route>

//       <Route path='signup' element={<ClientFreelancerSelectionPage />} />
//       <Route path='signupfreelancer' element={<SignUp />} />
//     </>

//   )
// ) 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);


