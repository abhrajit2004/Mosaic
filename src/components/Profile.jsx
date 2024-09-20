import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {


   const [editedData, setEditedData] = useState({ename: "", eemail:"", epassword: ""})

   const authToken = localStorage.getItem('authToken')

    const getUser = async () => {
        const response = await fetch('http://localhost:3000/api/auth/getuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            }
        })

        const userDetails = await response.json()
        setEditedData({ename: userDetails.name, eemail: userDetails.email, epassword: userDetails.password})
    }

    useEffect(() => {
        getUser()
        document.title = 'Your Profile - Mosaic'
    }, [authToken])

    const handleChange = (e) => {
        setEditedData({...editedData, [e.target.name]: e.target.value})
    }

    const handleSave = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/api/auth/updateuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },
            body: JSON.stringify({name: editedData.ename, email: editedData.eemail, password: editedData.epassword})
        })

        const data = await response.json()
    }

    return (
     <div className='text-white min-h-screen'>

      
       <form className='container mx-auto flex flex-col justify-center items-center gap-4 text-white my-7' action="">
         <h1 className='text-4xl font-bold mb-6'>Your Profile</h1>
        <label htmlFor="ename">Your name</label>
        <input onChange={handleChange} value={editedData.ename} className='w-[90vw] md:w-[30vw] rounded-lg px-4 py-2 border border-gray-500 bg-transparent' id='ename' name='ename' type="text" placeholder='Your name' />
      
      
        <label htmlFor="eemail">Your email</label>
        <input onChange={handleChange} value={editedData.eemail} className='w-[90vw] md:w-[30vw] rounded-lg px-4 py-2 border border-gray-500 bg-transparent' id='eemail' name='eemail' type="email" placeholder='Your email' />
        <label htmlFor="epassword">Your password</label>
        <input onChange={handleChange} value={editedData.epassword} className='w-[90vw] md:w-[30vw] rounded-lg px-4 py-2 border border-gray-500 bg-transparent' id='epassword' name='epassword' type="password" placeholder='Your password' />
         
        <button onClick={handleSave} className='bg-gray-800 px-6 py-2 rounded-lg transition hover:bg-slate-500 border border-slate-600'>Save</button>
        
      </form>
    </div>
  )
}

export default Profile
