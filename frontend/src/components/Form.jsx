import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {

  const params = useParams()

  const host = import.meta.env.VITE_HOST || 3000;


  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('authToken')){
      navigate('/')
    }

    if(params.id == 'login'){
      document.title = 'Login - Mosaic'
    }
    else if(params.id == 'signup'){
      document.title = 'Sign Up - Mosaic'
    }
    else{
      document.title = 'Mosaic'
    }

  }, [params.id])

 

  const [formData, setFormData] = useState({name: '', email: '', password: ''})

  
  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:${host}/api/auth/${params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json()
    if(data.success){
      toast.success("New account created successfully!")
      localStorage.setItem('authToken', data.authToken)
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }
    else{
      toast.error(data.errors[0].msg)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:${host}/api/auth/${params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: formData.email, password: formData.password })
    })

    const data = await response.json()
    if(data.success){
      toast.success("Logged in successfully!")
      localStorage.setItem('authToken', data.authToken)
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }
    else{
      toast.error(data.errors[0].msg)
    }
  }

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    <div className='min-h-screen'>
         
        <form className='container mx-auto flex flex-col justify-center items-center gap-4 text-white my-7' action="">
          {params.id === 'signup' &&
          <>
          <h1 className='text-4xl font-bold mb-6'>Sign Up</h1>
        <label htmlFor="name">Enter your name</label>
        <input onChange={handleChange} value={formData.name} className='w-[90vw] md:w-[30vw] rounded-lg px-4 py-2 border border-gray-500 bg-transparent' id='name' name='name' type="text" placeholder='Your name' />
        </>
      }
      {params.id === 'login' &&
        <h1 className='text-4xl font-bold mb-6'>Log In</h1>
      }
        <label htmlFor="email">Enter your email</label>
        <input onChange={handleChange} value={formData.email} className='w-[90vw] md:w-[30vw] rounded-lg px-4 py-2 border border-gray-500 bg-transparent' id='email' name='email' type="email" placeholder='Your email' />
        <label htmlFor="password">Enter your password</label>
        <input onChange={handleChange} value={formData.password} className='w-[90vw] md:w-[30vw] rounded-lg px-4 py-2 border border-gray-500 bg-transparent' id='password' name='password' type="password" placeholder='Your password' />
         
         {params.id === 'signup' &&
        <button onClick={handleSignup} className='bg-gray-800 px-6 py-2 rounded-lg transition hover:bg-slate-500 border border-slate-600'>Sign Up</button>
      }
        {params.id === 'login' && 
        <button onClick={handleLogin} className='bg-gray-800 px-6 py-2 rounded-lg transition hover:bg-slate-500 border border-slate-600'>Login</button>
        }
      </form>
    </div>
    </>
  )
}

export default Form
