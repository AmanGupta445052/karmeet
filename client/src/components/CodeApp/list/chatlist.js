import React, { useState } from 'react';
import { RiSearchLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";

function ChatList() {
  const [isAddMode, setIsAddMode] = useState(true);

  const toggleAddMode = () => {
    setIsAddMode(!isAddMode);
  };

  return (
    <div className='chatlist  w-96 '>
      <div className='search flex'>
        <div className='searchBar w-60 left-0 align-center item-center flex '>
        <div className='text-2xl m-5'><RiSearchLine /></div>
          <input type='text' placeholder='Search' className='left-0 w-52 h-10 bg-transparent border-none outline-none text-white'/>
        </div>
        <div className='addmode p' onClick={toggleAddMode}>
          {isAddMode ? <IoMdAdd /> : <FaMinus />}
        </div>
      </div>
    </div>
  );
}

export default ChatList;
