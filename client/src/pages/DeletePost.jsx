import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import Loader from '../components/Loader/Loader';

const DeletePost = ({ postId, onDelete }) => { // Añadido onDelete como prop
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const removePost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        onDelete(postId); // Llamar a onDelete para actualizar la lista de posts
      }
      setIsLoading(false);
    } catch (error) {
      console.log("No puede borrar post");
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Link className='btn sm danger' onClick={() => removePost()}>Delete</Link>
  );
};

export default DeletePost;
