import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaCheck } from 'react-icons/fa';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const ProfileSection = styled.section`
  padding: 2rem 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  background: #f4f4f4;
  padding: 2rem;
  border-radius: 10px;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  background: #007bff;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
`;

const ProfileDetails = styled.div`
  margin-top: 1rem;
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  margin-bottom: 1rem;
`;

const ProfileAvatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ddd;
`;

const AvatarForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;
`;

const AvatarInput = styled.input`
  display: none;
`;

const AvatarLabel = styled.label`
  cursor: pointer;
  color: #007bff;
  font-size: 1.5rem;
`;

const AvatarButton = styled.button`
  background: #28a745;
  color: #fff;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  margin-top: 0.5rem;
  cursor: pointer;
`;

const Form = styled.form`
  margin-top: 1rem;
  display:none;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  background: #ff4d4d;
  color: #fff;
  padding: 0.5rem;
  border-radius: 5px;
`;

const UserProfile = () => {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${currentUser.id}`, 
        {
          withCredentials: true, 
          headers: { 
            Authorization: `Bearer ${token}` 
          }
        });
        const { name, email, avatar } = response.data;
        setName(name);
        setEmail(email);
        setAvatar(avatar);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    getUser();
  }, [currentUser.id, token]);

  const changeAvatarHandler = async () => {
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set('avatar', avatar);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/change-avatar`, postData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvatar(response?.data.avatar);
      setAvatarPreview('');
    } catch (error) {
      console.error("Error changing avatar:", error);
    }
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        name,
        email,
        currentPassword,
        newPassword,
        confirmNewPassword
      };

      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/users/edit-user`, userData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        // log user out
        navigate('/logout');
      }
    } catch (error) {
      // handle error
      setError(error.response?.data?.message || 'An error occurred while updating user details.');
      console.error("Error updating user details:", error);
    }
  };


  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setIsAvatarTouched(true);

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <ProfileSection>
      <Container>
        <Button to={`/myposts/${currentUser.id}`}>My posts</Button>
        <ProfileDetails>
          <AvatarWrapper>
            <ProfileAvatar>
              <img src={avatarPreview || `${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`} alt="avatar" />
            </ProfileAvatar>
            <AvatarForm>
              <AvatarInput
                type="file"
                name="avatar"
                id="avatar"
                accept="png, jpg, jpeg"
                onChange={handleAvatarChange}
              />
              <AvatarLabel htmlFor="avatar">
                <FaEdit />
              </AvatarLabel>
              {isAvatarTouched && (
                <AvatarButton type="button" onClick={changeAvatarHandler}>
                  <FaCheck />
                </AvatarButton>
              )}
            </AvatarForm>
          </AvatarWrapper>
          <h1>{currentUser.name}</h1>
          <Form onSubmit={updateUserDetails}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <SubmitButton type="submit">Update details</SubmitButton>
          </Form>
        </ProfileDetails>
      </Container>
    </ProfileSection>
  );
};

export default UserProfile;
