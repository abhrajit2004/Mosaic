import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Posts from './components/Posts'
import Profile from './components/Profile'
import Footer from './components/Footer'
import PostPage from './components/PostPage'

function App() {
  

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Home /><Footer /></>
    },
    {
      path: "/:id",
      element: <><Navbar /><Form /><Footer /></>
    },
    {
      path: "/posts",
      element: <><Navbar /><Posts /><Footer /></>
    },
    {
      path: "/profile",
      element: <><Navbar /><Profile /><Footer /></>
    },
    {
      path: "/posts/:id",
      element: <><Navbar /><PostPage /><Footer /></>
    },
   ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App