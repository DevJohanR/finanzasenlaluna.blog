import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PostItem.module.css';
import PostAuthor from '../PostAuthor/PostAuthor';

const PostItem = ({ postID, category, title, description, authorID, thumbnail }) => {

  const shortDescription= description.length > 145 ? description.substr(0,145) + '...' : description; 
  const postTitle= title.length > 28 ? title.substr(0,28) + '...' : title; 
  return (
    <article className={styles.post}>
      <div className={styles.post_thumbnail}>
        <img src={thumbnail} alt={title} />
      </div>
      <div className={styles.post_content}>
        <Link to={`/posts/${postID}`} className={styles.post_link}>
          <h3>{postTitle}</h3>
        </Link>
        <p>{shortDescription}</p>
        <div className={styles.post_footer}>
          <PostAuthor authorID={authorID} />
          <Link to={`/posts/categories/${category}`} className={styles.category_link}>
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default PostItem;
