import React, {useEffect, useState} from 'react'
import styles from './Post.module.css'

import PostItem from '../PostItem/PostItem'
import Loader from '../Loader/Loader'
import axios from 'axios'





  
  const Post = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        const fetchPosts = async () =>{
            setIsLoading(true);
            try{
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`);
                setPosts(response?.data)
            }catch(err){
                console.log(err)
            }

            setIsLoading(false)
        }
        fetchPosts();
    }, [])

    if(isLoading){
        return <Loader/>
    }

    return (
        <section className={styles.posts}>
           {posts.length > 0 ? <div className={styles.postContainer}>
                {posts.map(({_id: id, thumbnail, category, title, description, creator, createdAt}) => (
                    <PostItem key={id} postID={id} thumbnail={thumbnail} category={category} title={title} description={description} authorID={creator} createdAt={createdAt} />
                ))}
            </div> : <h2 className={styles.center}> NO POST FOUNDS</h2> } 
        </section>
    );
}

export default Post;