import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostPage = () => {

  const [currentjson, setCurrentJson] = useState({title: '', content: ''})
  const [commentOwner, setCommentOwner] = useState('')
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const params = useParams()

  const host = import.meta.env.VITE_HOST;


  useEffect(() => {
    getParticularPost(params.id)
    const comments = JSON.parse(localStorage.getItem('comments'))
    if(comments){
      setComments(comments)
    }

    if(localStorage.getItem('authToken')){
      getUser()
    }
    else{
      setCommentOwner('Anonymous')
    }

    document.title = `${currentjson.title} - Mosaic`
   
  }, [currentjson.title])


  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const handleComment = () => {
    setComments([...comments, comment])

    localStorage.setItem('comments', JSON.stringify([...comments, comment]))
    setComment('')
  }
  

  const getParticularPost = async (id) => {
    const response = await fetch(`${host}/api/posts/fetchpost/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
    const json = await response.json()
    setCurrentJson({title: json.title, content: json.content})
  }

  const getUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('authToken')
        }
    })

    const userDetails = await response.json()
    setCommentOwner(userDetails.name)
  }


  

  return (
    <div className='flex flex-col gap-4 my-4 container mx-auto text-white min-h-[80vh]'>
      <h1 className='text-5xl font-bold text-center'>{currentjson.title}</h1>
      <p className='desc text-lg mx-4'>{currentjson.content}</p>
      <div className="p-4 w-full">
             <div className="bg-slate-700 rounded-lg min-h-[20vh] p-5">
                 <input value={comment} onChange={handleChange} className='w-[95%] md:w-[30vw] rounded-lg px-4 py-2 border border-gray-500 bg-transparent text-lg' id='comment' name='comment' type="text" placeholder='Write something...' />
                 <button onClick={handleComment} className='bg-slate-800 px-4 py-2 mt-4 mx-2 transition hover:bg-slate-500 rounded-lg text-lg'>Comment</button>
                 <div className="comments my-4 flex flex-col">
                  {comments.length === 0 && <p className='text-lg mx-2'>No comments yet...</p>}
                  {comments.map((comment, index) => {
                    return   <div key={index} className="comment bg-slate-800 p-4 rounded-lg my-2 w-[95%] md:w-1/2">
                      <p className="leading-relaxed text-base text-gray-400">{commentOwner} commented:</p>
                      <p className='text-lg'>{comment}</p>
                      
                      {/* <input ref={ref} type="reply" className='w-[30vw] rounded-lg px-4 py-2 border border-gray-500 bg-transparent text-lg hidden' />
                      <button onClick={handleReply} className='text-md bg-blue-800 px-6 py-2 rounded-lg transition hover:bg-slate-500 border border-slate-600 mt-4 mx-2'>Reply</button>
                      <p className='text-lg mt-4 mx-20 hidden'>This is a comment</p> */}
                  </div>
                  })}
                    
                 </div>
             </div>
            
      </div>

    </div>
  );
};

export default PostPage;