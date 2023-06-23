import React from 'react'
import { Sidebar } from './components/Sidebar'
import {Chat} from './components/Chat'
export const Home = () => {
  return (
    <div className='Main-Container'>
      <div className="home-container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}
