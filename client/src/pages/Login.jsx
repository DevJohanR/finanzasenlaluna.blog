import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
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
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  // Manejador de cambio
  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <AuthSection>
      <Container>
        <h2>Sign In</h2>
        <Form className="login_form">
          <ErrorMessage>This is an error message</ErrorMessage>
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
