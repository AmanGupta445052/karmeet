import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Teamlogo from './teamwork.png';
import RightSide from './rightside.jpg';
import MenuText from './herotxt.svg';
import Features from './Features.svg';
import downarrow from './down-arrow.png';
import Promo from './Promo.svg';
import { FaFacebook, FaInstagram, FaGithub, FaDiscord } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";




 

const DashboardloggedIn = () => {

  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignUp = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google signup success:", result.user);
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
  };
  return (
    <>
      <nav className="bg-white text-black w-screen divide-x divide-black-200">
        <div className="p-4 flex items-center relative">
          <img src={Teamlogo} alt="Navbar Pic" className="h-12 w-12 ml-3 cursor-pointer" />
          <div className="text-3xl ml-3 font-acnolica">Karmeet</div>
          <div className="mr-auto ml-14 flex space-x-12">
            <button className="text-xl relative">
              Products
              <img src={downarrow} alt="Navbar" className="h-5 w-5 ml-20 absolute  top-1/2 transform -translate-y-1/2" />
            </button>
            <button className="text-xl">Solutions</button>
            <button className="text-xl">Enterprise</button>
            <button className="text-xl">Resources</button>
          </div>
          <div className="absolute top-0 bottom-0 border-l-4 ml-52 h-full border-black"></div>
          <div className='ml-96 right-0 bg-black absolute w-52 h-full text-3xl hover:border-l-amber-400 text-white justify-center items-center p-3 pt-5 pl-12'>
            <Link to="/">Logout</Link>
          </div>
        </div>
        <div className="border-b-4 w-full h-1 border-black"></div>
      </nav>

      <div className='w-screen h-[646px] flex'>
        <div className='w-1/2 h-[646px] bg-[#5D5FEF] flex flex-col justify-center items-center'>
          <img src={MenuText} alt='Menu Text' className='mb-10 mr-32' />
          <div className="flex justify-center space-x-4">
            <button className='bg-black w-52 h-16 rounded-2xl text-white text-2xl '><Link to="/lobby">Collaborate Meet</Link></button>  
          </div>
        </div>
        <div className='w-1/2 h-[646px]'>
          <img src={RightSide} alt="Navbar Pic" className="h-full w-full object-cover" />
        </div>             
      </div>
      <div className="border-b-4 w-full h-1 border-black"></div>

      <div className="h-[1242px] w-screen bg-black">
        <img src={Features} alt="Navbar Pic" className="h-full w-full object-cover" />
      </div>
      <div className="border-b-4 w-full h-1 border-black"></div>

      <div className='h-[284px] w-screen bg- '>
        <img src={Promo} alt="Navbar "className=""/>
      </div>
      <div className="border-b-4 w-full h-1 border-black"></div>

      <div className='h-[300px] w-screen bg-indigo-900'>
        <div className='w-screen h-[220px] space-x-48 flex '>
          <div className='text-2xl text-white ml-auto pt-5 pr-20'>Contacts
            <ul>
              <li className='py-3 text-lg'>Phone: 8539995262</li>
              <li className='py-3 text-lg'>Email: amanraj11188@gmail.com</li>
              <li className='py-3 text-lg'>GitHub: <a href="https://github.com/KARMEET/karmeet">KARMEET</a></li>
            </ul>
          </div>
          <div className='text-2xl text-white ml-auto pt-5 pr-20'>Services</div>
          <div className='text-2xl text-white ml-auto pt-5 pr-20'>Navigation</div>
        </div>
        <footer className="bg-gray-800 py-4 text-white text-center">
          <div className="flex justify-center space-x-4">
            <a href="https://www.facebook.com" >
              <FaFacebook className="text-2xl " />
            </a>
            <a href="https://www.instagram.com">
              <FaInstagram className="text-2xl" />
            </a>
            <a href="https://github.com">
              <FaGithub className="text-2xl" />
            </a>
            <a href="https://discord.com">
              <FaDiscord className="text-2xl" />
            </a>
          </div>
          <div className="mt-4">
            &copy; {new Date().getFullYear()} Karmeet. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default DashboardloggedIn;
