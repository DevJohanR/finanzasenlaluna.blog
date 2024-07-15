import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import DeletePost from './DeletePost';

// Estilos con styled-components para mantener el estilo coherente
const DashboardContainer = styled.section`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    padding: 40px;
  }

  @media (min-width: 1024px) {
    padding: 60px;
  }
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
`;

const PostArticle = styled.article`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

const PostThumbnail = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 10px;

  @media (min-width: 768px) {
    width: 200px;
    height: 150px;
    margin-bottom: 0;
  }

  @media (min-width: 1024px) {
    width: 250px;
    height: 200px;
  }
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const PostContent = styled.div`
  flex: 1;
  padding: 0 20px;

  @media (min-width: 768px) {
    padding: 0 30px;
  }

  @media (min-width: 1024px) {
    padding: 0 40px;
  }
`;

const Title = styled.h5`
  margin-bottom: 10px;
  font-size: 1.2rem;

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }

  @media (max-width: 767px) {
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }
`;

const Button = styled(Link)`
  padding: 10px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;
  margin: 5px 0;
  flex: 1;
  margin: 0 5px;

  &:hover {
    background-color: #0056b3;
  }

  &.delete {
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  }

  @media (min-width: 768px) {
    padding: 12px;
    margin: 0 5px;
  }

  @media (min-width: 1024px) {
    padding: 15px;
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/users/${id}`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [id, token]);

  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId)); // Actualizar la lista de posts después de eliminar
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <DashboardContainer>
      {posts.length > 0 ? (
        <PostContainer>
          {posts.map((post) => (
            <PostArticle key={post._id}>
              <PostThumbnail>
                <ThumbnailImage src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${post.thumbnail}`} alt="" />
              </PostThumbnail>
              <PostContent>
                <Title>{post.title}</Title>
              </PostContent>
              <ActionContainer>
                <Button to={`/posts/${post._id}`}>View</Button>
                <Button to={`/posts/${post._id}/edit`} className="primary">Edit</Button>
                <Button as="button" className="delete" onClick={() => handleDelete(post._id)}>Delete</Button>
              </ActionContainer>
            </PostArticle>
          ))}
        </PostContainer>
      ) : (
        <h2 className="center">You have no posts yet.</h2>
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
