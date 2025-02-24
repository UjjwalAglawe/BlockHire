import React from 'react'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Sidebar from './Components/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

function SliderLayout() {
  return (
    <>
      <Header />
      {/* <div className='flex'>
    <div className='w-full'><Sidebar/></div>
    <div className='w-fit'><Outlet/></div>
    </div> */}
      <div className='flex'>
        <div className='w-[15%]'><Sidebar /></div>
        <div className='flex-1'><Outlet /></div>
      </div>
      <Footer />
    </>
  )
}

export default SliderLayout