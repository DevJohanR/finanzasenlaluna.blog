import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { useEffect } from 'react';
import axios from 'axios'

const DeletePost = ({postId: id}) => {
  const navigate = useNavigate()
  const location = useLocation()

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  //redirect to login page for any user who isn't logged in 

  useEffect(()=>{
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const removePost = async () =>{
    try{
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
      if(Response.status == 200){
        if(location.pathname == `/myposts/${currentUser.id}`){
          navigate(0)
        }else{
          navigate('/')
        }
      }
    }catch(error){
      console.log("No puede borrar post")
    }
  }

  return (
    <Link className='btn sm danger' onClick={()=> removePost(id)}>Delete</Link>
  )
}

export default DeletePost