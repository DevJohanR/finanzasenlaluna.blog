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
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostArticle = styled.article`
  border: 1px solid #ccc;
  margin-bottom: 20px;
  padding: 15px;
`;

const PostThumbnail = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: auto;
`;

const Title = styled.h5`
  margin-bottom: 10px;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled(Link)`
  padding: 10px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
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
              <Title>{post.title}</Title>
              <ActionContainer>
                <Button to={`/posts/${post._id}`}>View</Button>
                <Button to={`/posts/${post._id}/edit`} className="primary">Edit</Button>
                <DeletePost postId={post._id} onDelete={handleDelete} /> {/* Pasar handleDelete como prop */}
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
