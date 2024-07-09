import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './PostAuthor.module.css';  
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';

// Importar correctamente los archivos JSON de localización
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

// Añadir localizaciones a TimeAgo
TimeAgo.addLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({authorID,createdAt}) => {
const [author, setAuthor] = useState({})

useEffect(()=>{
  const getAuthor = async () =>{
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${authorID}`)
      setAuthor(response?.data);
    }catch(error){
      console.log(error)
    }
  }

  getAuthor();
},[])

const imageAuthorUrl = `${import.meta.env.VITE_ASSETS_URL}/uploads/${author?.avatar}`;

  return (
    <Link to="/posts/users/sdfdsf" className={styles.post_author}>
      <div className={styles.post_author_avatar}>
        <img src={imageAuthorUrl} alt="Ernest Achiever" />
      </div>
      <div className={styles.post_author_details}>
        <h5>Por: {author?.name} </h5>
        <small>
        <ReactTimeAgo date={new Date(createdAt)} locale='en-US' />
            </small>
      </div>
    </Link>
  );
}

export default PostAuthor;
