import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Posts = () => {


  const [post, setPost] = useState({ title: '', content: '' })
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  const host = import.meta.env.VITE_HOST;


  useEffect(() => {
    getPosts()
    document.title = 'Your Posts - Mosaic'
  }, [])


  const getPosts = async () => {
    const response = await fetch(`${host}/api/posts/fetchposts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      }
    })

    const data = await response.json()
    setPosts(data)
  }

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }

  const handlePost = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/posts/createpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ title: post.title, content: post.content })
    })

    const data = await response.json()
    setPosts(data)

    if (data.success) {
      toast.success(data.success); // Show toast before navigating
    } 
    else {
      toast.error("Post creation failed");
    }
  
   
    setTimeout(() => navigate('/'), 1000);
    
  }

  const handleDelete = async (id) => {
    const response = await fetch(`${host}/api/posts/deletepost/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
    })

    const json = await response.json()
    setPosts(posts.filter(post => post._id !== id))

    if (json.Success) {
      toast.success(json.Success);
    } 
    else {
      toast.error("Post deletion failed");
    }

  }

  const handleEdit = async (id) => {

    const currentData = posts.filter(post => post._id === id)
    setPost({ title: currentData[0].title, content: currentData[0].content })
    setPosts(posts.filter(post => post._id !== id))

    const response = await fetch(`${host}/api/posts/updatepost/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authToken"),
      },
      body: JSON.stringify({ title: post.title, content: post.content })
    })


    const json = await response.json()

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
      <div className='text-white my-6'>
        <h1 className='text-5xl text-center font-bold mt-6'>Create A Post</h1>
        {/* Create a form for making posts with the help of react and tailwind css */}

        <form className='flex flex-col gap-4 mt-6 justify-center items-center mx-32'>

          <input onChange={handleChange} value={post.title} name='title' id='title' type="text" placeholder='Title' className='bg-transparent w-[90vw] md:w-full p-2 border border-gray-400 rounded-lg text-2xl font-bold' />
          <textarea onChange={handleChange} value={post.content} name='content' id='content' placeholder='Content' className='bg-transparent w-[90vw] md:w-full p-2 border rounded-lg h-[500px] text-lg active:border-blue-500'></textarea>



          <button onClick={handlePost} className='bg-gray-800 text-white px-6 py-4 rounded-lg transition hover:bg-slate-500 border border-slate-600 w-[200px] md:w-[10vw] text-xl font-bold disabled:bg-gray-400' disabled={post.title.length < 5 || post.content.length < 5}>Post</button>

        </form>

        <div className="posts">
          <h2 className='text-4xl text-center font-bold mt-6'>Your Posts</h2>
          {/* Display the posts that the user has created */}
          <div className='flex flex-col gap-4 mt-6 justify-center items-center mx-32'>
            {posts.length === 0 && <p className='text-2xl text-center mx-4'>No posts yet...</p>}
            {posts.length > 0 && posts.map((post, index) => {
              return <div key={index} className='bg-gray-800 p-4 rounded-lg w-[90vw] '>
                <h3 className='text-2xl font-bold'>{post.title}</h3>
                <p className='text-lg'>{post.content.split(".")[0]}</p>
                <p className='leading-relaxed text-base text-gray-400'>You posted it on: {post.date.split('T')[0]}</p>
                <div className="buttons my-2 flex gap-2">
                  <button onClick={() => handleEdit(post._id)} className='bg-blue-800 px-6 py-2 rounded-lg transition hover:bg-slate-500 border border-slate-600'>Edit</button>
                  <button onClick={() => { handleDelete(post._id) }} className='bg-blue-800 px-6 py-2 rounded-lg transition hover:bg-slate-500 border border-slate-600'>Delete</button>
                </div>

              </div>
            })}

          </div>
        </div>

      </div>
    </>
  )
}

export default Posts