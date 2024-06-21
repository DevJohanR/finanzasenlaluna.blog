import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Avatar1 from '../components/images/avatar1.jpg';
import Avatar2 from '../components/images/avatar2.jpg';
import Avatar3 from '../components/images/avatar3.jpg';
import Avatar4 from '../components/images/avatar4.jpg';
import Avatar5 from '../components/images/avatar5.jpg';

const authorsData = [
  {id: 1, avatar: Avatar1, name: 'Norman', posts: 3},
  {id: 2, avatar: Avatar2, name: 'Liliana', posts: 5},
  {id: 3, avatar: Avatar3, name: 'Yeimmi', posts: 0},
  {id: 4, avatar: Avatar4, name: 'Johan', posts: 2},
  {id: 5, avatar: Avatar5, name: 'David', posts: 1},
];

// Styled components
const AuthorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const AuthorLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background: #f4f4f4;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  &:hover {
    background: #e9e9e9;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Authors = () => {
  const [authors, setAuthors] = useState(authorsData);

  return (
    <AuthorsContainer>
      {authors.length > 0 ? (
        authors.map(({id, avatar, name, posts}) => (
          <AuthorLink key={id} to={`/posts/users/${id}`}>
            <Avatar src={avatar} alt={`Image of ${name}`} />
            <AuthorInfo>
              <h4>{name}</h4>
              <p>{posts} posts</p>
            </AuthorInfo>
          </AuthorLink>
        ))
      ) : (
        <h2>No users/authors found.</h2>
      )}
    </AuthorsContainer>
  );
}

export default Authors;
