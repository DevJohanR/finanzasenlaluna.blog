import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext.jsx';

// Creando componentes de estilo
const AuthSection = styled.section`
  padding: 20px;
  background-color: #f4f4f4;
`;

const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

  &:focus {
    border-color: #05ca05;
    outline: none;
    box-shadow: 0 0 8px rgba(5, 202, 5, 0.2);
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #05ca05;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #03a303;
    box-shadow: 0 0 10px rgba(5, 202, 5, 0.5);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  // Manejador de cambio
  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const loginUser = async (e) =>{
    e.preventDefault();
    setError('')
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
      const user = await response.data;
      setCurrentUser(user)
    }catch (err){
      setError(err.response.data.message)
    }
  } 

  return (
    <AuthSection>
      <Container>
        <h2>Sign In</h2>
        <Form className="login_form" onSubmit={loginUser}>
          {error && <ErrorMessage>{error}</ErrorMessage>} 
          <Input
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <Button type="submit">Ingresar</Button>
        </Form>
        <small>¿No tienes cuenta? <Link to="/register">Registrarte</Link></small>
      </Container>
    </AuthSection>
  );
}

export default Login;
