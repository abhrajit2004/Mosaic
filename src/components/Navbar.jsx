import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('authToken')
    navigate('/')
  }

  return (
    <nav className='bg-gray-700 text-white flex justify-between items-center flex-col md:flex-row'>
      <div className="logo mx-6">
        <Link to={"/"}>
          <span className='font-bold text-2xl'>
            &lt; Mosaic /&gt;
          </span>
        </Link>
      </div>
     
     <ul className='flex gap-1 md:gap-2 justify-end items-center px-4 py-2'>
        {localStorage.getItem('authToken') ? 
        
        <>
        <Link to={"/"} className='bg-slate-800 px-6 py-2 rounded-lg  hover:bg-slate-500 border transition border-slate-600'>Home</Link> 
        <Link to={"/posts"} className='bg-slate-800 px-6 py-2 rounded-lg  hover:bg-slate-500 border transition border-slate-600'>Posts</Link> 
        <Link to={"/profile"} className='bg-slate-800 px-6 py-2 rounded-lg  hover:bg-slate-500 border transition border-slate-600'>Profile</Link> 
        <button onClick={handleLogOut} to={"/"} className='bg-slate-800 px-6 py-2 rounded-lg  hover:bg-slate-500 border transition border-slate-600'>Log Out</button> 
        </> 
          :
          <>
            <Link to={"/login"} className='bg-gray-800 px-6 py-2 rounded-lg transition hover:bg-slate-500 border border-slate-600'>Login</Link>
            <Link to={"/signup"} className='bg-gray-800 px-6 py-2 rounded-lg transition hover:bg-slate-500 border border-slate-600'>Sign Up</Link>
          </>}
      </ul>
    </nav>
  )
}

export default Navbar
