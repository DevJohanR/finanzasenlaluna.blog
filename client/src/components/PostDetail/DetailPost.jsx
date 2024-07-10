import React,{useContext,useEffect,useState} from 'react';
import PostAuthor from '../PostAuthor/PostAuthor';
import { Link,useParams } from 'react-router-dom';
import Thumbnail from '../images/blog22.jpg';
import styles from './DetailPost.module.css';
import DeletePost from '../../pages/DeletePost'
import Loader from '../Loader/Loader'
import { UserContext } from '../../context/userContext';
import axios from 'axios';


const DetailPost = () => {

    const {id} = useParams();
    const [post, setPost] = useState(null);
  
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {currentUser} = useContext(UserContext);

    useEffect(() => {
        console.log(import.meta.env.VITE_BASE_URL); 
        const getPost = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`);
                setPost(response.data);
                
            } catch (error) {
                setError(error.message);  // Ensure error message is a string
            }
            setIsLoading(false);
        };

        getPost();
    }, [id]);

    if(isLoading){
        return <Loader/>
    }

    return (
        <section className={styles.postDetail}>
            {error && <p className='error'>{error}</p>}
          {post &&   <div className={`${styles.container} ${styles.postDetailContainer}`}>
                <div className={styles.postDetailHeader}>
                    <PostAuthor authorID={post.creator} createdAt={post.createdAt}/>
                    {currentUser?.id == post?.creator && <div className={styles.postDetailButtons}>
                        <Link to={`/posts/${post?._id}/edit`} className={`${styles.btn} ${styles.btnPrimary}`}>Edit</Link>
                    <DeletePost postId={id} />
                    </div>}
                </div>
                <h1>{post.title} </h1>
                <div className={styles.postDetailThumbnail}>
                    <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
                </div>
                <p dangerouslySetInnerHTML={{__html: post.description}}></p>
            </div>}
        </section>
    );
}

export default DetailPost;
