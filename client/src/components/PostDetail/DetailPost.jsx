import React from 'react';
import PostAuthor from '../PostAuthor/PostAuthor';
import { Link } from 'react-router-dom';
import Thumbnail from '../images/blog22.jpg';
import styles from './DetailPost.module.css';

const DetailPost = () => {
    return (
        <section className={styles.postDetail}>
            <div className={`${styles.container} ${styles.postDetailContainer}`}>
                <div className={styles.postDetailHeader}>
                    <PostAuthor/>
                    <div className={styles.postDetailButtons}>
                        <Link to="/posts/werwer/edit" className={`${styles.btn} ${styles.btnPrimary}`}>Edit</Link>
                        <Link to="/posts/werwer/delete" className={`${styles.btn} ${styles.btnDanger}`}>Delete</Link>
                    </div>
                </div>
                <h1>This is the post title!</h1>
                <div className={styles.postDetailThumbnail}>
                    <img src={Thumbnail} alt="" />
                </div>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit quidem cumque unde consequuntur adipisci iste reprehenderit provident molestias sapiente magni temporibus doloremque alias architecto eum animi sunt dolore ratione, distinctio nulla commodi? Nobis sit vel esse minima sunt omnis ab?</p>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit quidem cumque unde consequuntur adipisci iste reprehenderit provident molestias sapiente magni temporibus doloremque alias architecto eum animi sunt dolore ratione, distinctio nulla commodi? Nobis sit vel esse minima sunt omnis ab?</p>
                 <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis alias quod tempora ducimus magnam minima aliquam, possimus debitis fuga perspiciatis, commodi velit voluptatem aspernatur eaque libero deserunt dolorem illo optio dolor ipsam delectus itaque incidunt neque. Quibusdam deleniti minus quasi earum? Praesentium vero quaerat nemo qui iste ex ipsam veritatis laborum quod temporibus neque quam aut, nostrum officiis nisi perspiciatis natus nulla deleniti id enim molestias amet. Cum debitis sequi explicabo rem iste nam, quos rerum id minima pariatur corporis, placeat beatae dignissimos labore voluptate non quisquam ducimus at deserunt ipsum? Maxime voluptates dolorem nulla quod iste, natus ipsa ratione eius eos asperiores omnis ducimus rem repudiandae eum culpa nemo soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quidem eligendi minus consequatur est dicta aperiam nihil id, sapiente cumque. </p>
                 

            </div>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt consectetur voluptatibus rerum neque aut officia nam libero sunt asperiores fugiat?</p>
        </section>
    );
}

export default DetailPost;
