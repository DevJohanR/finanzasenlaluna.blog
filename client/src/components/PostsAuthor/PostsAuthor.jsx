import React, {useState} from 'react'
import { DUMMY_POSTS } from '../../data'
import PostItem from '../PostItem/PostItem'


const PostsAuthor = () => {
    const [posts, setPosts] = useState(DUMMY_POSTS)
  return (
    <section className={styles.posts}>
    {posts.length > 0 ? <div className={styles.postContainer}>
         {posts.map(({id, thumbnail, category, title, description, authorID}) => (
             <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} description={description} authorID={authorID} />
         ))}
     </div> : <h2 className={styles.center}> NO POST FOUNDS</h2> } 
 </section>
  )
}

export default PostsAuthor