import React, { useState, useEffect } from 'react';
import PostItem from '../components/PostItem/PostItem';
import Loader from '../components/Loader/Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Define styled components
const Section = styled.section`
  padding: 2rem; /* Add more styles if needed */
`;

const PostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CenteredMessage = styled.h2`
  text-align: center;
  padding-top: 5rem;
  margin-inline: center;
  display: block;
  width: 100%;
`;

const CategoryPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { category } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/categories/${category}`);
        setPosts(response?.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [category]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Section>
      {posts.length > 0 ? (
        <PostContainer>
          {posts.map(({ _id: id, thumbnail, category, title, description, creator, createdAt }) => (
            <PostItem
              key={id}
              postID={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              description={description}
              authorID={creator}
              createdAt={createdAt}
            />
          ))}
        </PostContainer>
      ) : (
        <CenteredMessage>NO POST FOUNDS</CenteredMessage>
      )}
    </Section>
  );
};

export default CategoryPosts;
