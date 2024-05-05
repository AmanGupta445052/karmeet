import React from 'react'
import Chat from './CodeApp/chat'
import List from './CodeApp/list/list'
import Detail from './CodeApp/detail'

export default function ChatScreen() {
  return (
    <div className=' flex bg-purple-500'>
    <List />
    <Chat />
    <Detail />
    </div>
  )
}
