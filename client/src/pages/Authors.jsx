import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader/Loader';



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
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    console.log(`Probando: ${import.meta.env.VITE_BASE_URL}`)
    const getAuthors = async () =>{
      setIsLoading(true);
      try{
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`)
        setAuthors(response.data)
      }catch (error){
        console.log(error)
      }
      setIsLoading(false)
    }
    getAuthors();
  },[])

  if(isLoading){
    return <Loader/>
  }

  return (
    <AuthorsContainer>
      {authors.length > 0 ? (
        authors.map(({_id: id, avatar, name, posts}) => (
          <AuthorLink key={id} to={`/posts/users/${id}`}>
            <Avatar src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`} alt={`Image of ${name}`} />
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
