import React from 'react'
import UserInfo from './userinfo';
import ChatList from './chatlist';
function list() {
  return (
    <div className='w-96 h-screen '>
    <UserInfo />
    <ChatList />

    </div>
  )
}

export default list