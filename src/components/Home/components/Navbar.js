import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../../../firebase-config'
import { AuthContext } from "../../../Context/AuthContext";

const Navbar = () => {
  const {currentUser} = useContext (AuthContext)
  return (
    <div className='navbar'>
      <span className='logo'>CHAT<small>.zeus</small></span>
      <div className='user'>
        <img src={currentUser.photoURL} alt="user avatar"/>
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>LOGOUT</button>
      </div>
    </div>
  )
}

export default Navbar