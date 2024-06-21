import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Importando los datos de ejemplo
import { DUMMY_POSTS } from '../data';

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
  const [posts, setPosts] = useState(DUMMY_POSTS);

  return (
    <DashboardContainer>
      {posts.length > 0 ? (
        <PostContainer>
          {posts.map(post => (
            <PostArticle key={post.id}>
              <PostThumbnail>
                <ThumbnailImage src={post.thumbnail} alt="" />
              </PostThumbnail>
              <Title>{post.title}</Title>
              <ActionContainer>
                <Button to={`/posts/${post.id}`}>View</Button>
                <Button to={`/posts/${post.id}/edit`} className="primary">Edit</Button>
                <Button to={`/posts/${post.id}/delete`} className="danger">Delete</Button>
              </ActionContainer>
            </PostArticle>
          ))}
        </PostContainer>
      ) : (
        <h2 className="center">You have no posts yet.</h2>
      )}
    </DashboardContainer>
  );
}

export default Dashboard;
