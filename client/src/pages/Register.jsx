import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';  // Asegúrate de importar Link de react-router-dom

// Creando componentes de estilo
const RegisterSection = styled.section`
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

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  // Manejador de cambio usando el método que te gustó
  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <RegisterSection>
      <Container>
        <h2>Sign Up</h2>
        <Form className="register_form">
          <ErrorMessage>This is an error message</ErrorMessage>
          <Input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
            onChange={changeInputHandler}
          />
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
          <Input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={userData.password2}
            onChange={changeInputHandler}
          />
          <Button type="submit">Register</Button>  // Botón estilizado
        </Form>
        <small>¿Ya tienes cuenta? <Link to="/login">Ingresar</Link></small>
      </Container>
    </RegisterSection>
  );
}

export default Register;
