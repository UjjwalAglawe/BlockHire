import React from 'react'
import Header from './Components/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import Chatbot from './Components/Chatbot/Chatbot'

function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    {/* <Chatbot/> */}
    <Footer/>
   
    </>
  )
}

export default Layout