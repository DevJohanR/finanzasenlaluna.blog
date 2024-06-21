import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PostAuthor.module.css';  // Importa el CSS module
import Avatar from '../images/avatar1.jpg'; // Asegúrate de que el path es correcto

const PostAuthor = () => {
  return (
    <Link to="/posts/users/sdfdsf" className={styles.post_author}>
      <div className={styles.post_author_avatar}>
        <img src={Avatar} alt="Ernest Achiever" />
      </div>
      <div className={styles.post_author_details}>
        <h5>By: Ernest Achiever</h5>
        <small>Just Now</small>
      </div>
    </Link>
  );
}

export default PostAuthor;
