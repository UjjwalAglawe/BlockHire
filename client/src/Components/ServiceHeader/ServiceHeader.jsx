import React from 'react'
import { Link } from 'react-router-dom'

function ServiceHeader() {
    const service = [
        {
            name:"Web Development",
            to : ""
        },
        {
            name:"App Development",
            to : ""
        },
        {
            name:"Marketing",
            to : ""
        },
        {
            name:"Video and Editing",
            to : ""
        },
        {
            name:"Graphic Design",
            to : ""
        },
        {
            name:"Cloud Computing",
            to : ""
        },
        {
            name:"Artist",
            to:""
        }
    ]
  return (
    <div className='w-full  border-gray-200 flex bg-white  justify-evenly py-2 '>
        {
            service.map((item,index)=>(
                <Link key={index} to = {item.to} className='motion-preset-pop motion-duration-250 px-2 hover:scale-105 transition duration-200 hover:shadow-lg hover:shadow-blue-200'>
                 {item.name}
                </Link>
            ))
        }
    </div>
  )
}

export default ServiceHeader