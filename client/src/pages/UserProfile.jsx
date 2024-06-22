import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaEdit, FaCheck } from 'react-icons/fa';
import AvatarImage from '../components/images/avatar1.jpg'; // Asegúrate de que la ruta es correcta

const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
`;

const Container = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 600px;
`;

const Button = styled(Link)`
  display: block;
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  text-align: center;
  border-radius: 5px;
  text-decoration: none;
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const AvatarWrapper = styled.div`
  margin-bottom: 20px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
`;

const Avatar = styled.img`
  width: 100%;
  height: auto;
`;

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const FormAction = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const UserProfile = () => {
  const [avatar, setAvatar] = useState(AvatarImage);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <ProfileSection>
      <Container>
        <Button to="/myposts/sdfsdf">Mis publicaciones</Button>
        <AvatarWrapper>
          <Avatar src={avatar} alt="User Avatar" />
        </AvatarWrapper>
        <Form>
          <Input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={handleAvatarChange} />
          <Label htmlFor="avatar"><FaEdit /> Edit</Label>
          <FormAction>
            <ActionButton><FaCheck /> Confirmar</ActionButton>
          </FormAction>
        </Form>
        <Form>
          <Input type="text" placeholder="Nombre Completo" value={name} onChange={e => setName(e.target.value)} />
          <Input type="email" placeholder="Correo Electronico" value={email} onChange={e => setEmail(e.target.value)} />
          <Input type="password" placeholder="Contraseña Actual" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
          <Input type="password" placeholder="Contraseña Nueva" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          <Input type="password" placeholder="Confirmar Nueva Contraseña" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
          <FormAction>
            <ActionButton type="submit">Actualizar Detalles</ActionButton>
          </FormAction>
        </Form>
      </Container>
    </ProfileSection>
  );
}

export default UserProfile;
