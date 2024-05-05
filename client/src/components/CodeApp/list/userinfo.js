import React from 'react'
import { IoIosMore } from "react-icons/io";
import { IoIosVideocam } from "react-icons/io";
import { FaEdit } from "react-icons/fa";


function userinfo() {
  return (
    <div className=''>
    <div className='user flex w-96 pt-3'>
    <h1 className='h-10 w-10 bg-black text-white rounded-full pt-3 pl-3 m-3'>A</h1>
    <h2 className='w-36 text-2xl pl-3 pt-1'>Aman</h2>
    <div className='w-10 pt-1 px-1 ml-14 h-5 text-3xl flex'>
    <IoIosMore />
    </div >
    <div className='w-10 pt-1 px-1  h-5 text-3xl flex'>
    <IoIosVideocam />
    </div>
    <div className='w-10 pt-1  px-1 h-5 text-2xl flex'>
    <FaEdit/>
    </div>
    </div >
    <div className=''></div>
    </div>
  )
}

export default userinfo