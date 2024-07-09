import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError('');

    if (userData.password !== userData.password2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      console.log("SENDING USER DATA:", userData); // LOG DE DATOS ENVIADOS
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, userData);
      const newUser = response.data;
      console.log("API RESPONSE:", newUser); // LOG DE LA RESPUESTA DE LA API
      if (!newUser) {
        setError("No se puede registrar el usuario, intente nuevamente");
      } else {
        navigate('/login');
      }
    } catch (err) {
      console.error("ERROR RESPONSE:", err); // LOG DEL ERROR
      if (err.response) {
        console.error("ERROR RESPONSE DATA:", err.response.data); // LOG DE LOS DATOS DEL ERROR
        setError(err.response.data.message || 'Error al registrar el usuario');
      } else {
        setError('Error al registrar el usuario');
      }
    }
  };

  return (
    <RegisterSection>
      <Container>
        <h2>Sign Up</h2>
        <Form className="register_form" onSubmit={registerUser}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
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
          <Button type="submit">Register</Button>
        </Form>
        <small>¿Ya tienes cuenta? <Link to="/login">Ingresar</Link></small>
      </Container>
    </RegisterSection>
  );
}

export default Register;
