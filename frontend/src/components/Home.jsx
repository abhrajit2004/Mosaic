import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const host = import.meta.env.VITE_HOST || 3000;

  const navigate = useNavigate()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    getAllPosts()
    

    document.title = 'Mosaic - A Social Media Platform for Techies'
  }, [])

  const getAllPosts = async () => {
    const response = await fetch(`http://localhost:${host}/api/posts/fetchallposts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })

    const data = await response.json()
    setPosts(data)
  }

  

  return (

    <>
 
    <div className='text-white my-6 min-h-screen'>
      <h1 className='text-5xl container m-auto font-bold mt-6 w-[80vw] md:w-[30vw]'>Create Tech Posts To Let The World Know You</h1>
      <p className='text-lg container m-auto mt-6 w-[80vw] md:w-[30vw]'>Mosaic is a platform where you can create posts about technology and share them with the world. You can also read posts created by other users and comment on them.</p>
      <section className="text-white body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col flex-wrap ">

           {posts.map((post, index)=>{
             return <div key={index} className="w-full p-4">
             <div className="bg-slate-700 rounded-lg p-5 w-full md:flex gap-[20px] items-center">
              
              <div className="cover">
                <Link to={`/posts/${post._id}`}><img className="rounded transition object-cover object-center mb-6 hover:shadow-md hover:shadow-slate-900 w-[400px]" src="./tech.jpg" alt="content" /></Link>
              </div>
               
               <div className="details">
                 <h2 className="text-xl mb-4 font-thin">Post By {post.name}</h2>
                 <h2 className="text-xl title-font mb-4 font-bold">{post.title}</h2>
                 <p className="leading-relaxed text-base">{post.content.split(".")[0]}</p>
                 <p className="leading-relaxed text-base text-gray-400">Posted on: {post.date.split("T")[0]}</p>
                 
                 <Link to={`/posts/${post._id}`}><button className='bg-slate-800 px-4 py-2 mt-4 transition hover:bg-slate-500 rounded-lg'>Read More...</button></Link>
               </div>
                 
             </div>
           </div>
           })}

          </div>
        </div>
      </section>

    </div>
    </>
          
  )
}

export default Home