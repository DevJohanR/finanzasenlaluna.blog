import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { UserContext } from '../context/userContext';


// Styled components
const CreatePostContainer = styled.section`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  box-sizing: border-box;

  @media (max-width: 360px) {
    padding: 10px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  background: #fff;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: auto;

  @media (min-width: 1280px) {
    max-width: 70%;
  }

  @media (min-width: 1367px) {
    max-width: 60%;
  }
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #04ab04;
    box-shadow: 0 0 8px rgba(4, 171, 4, 0.3);
  }

  @media (min-width: 1280px) {
    padding: 15px;
  }
`;

const Select = styled.select`
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #04ab04;
    box-shadow: 0 0 8px rgba(4, 171, 4, 0.3);
  }

  @media (min-width: 1280px) {
    padding: 15px;
  }
`;

const FileInputContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;

  label {
    font-size: 14px;
    margin-bottom: 5px;
  }

  input[type="file"] {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:focus {
      border-color: #04ab04;
      box-shadow: 0 0 8px rgba(4, 171, 4, 0.3);
    }

    @media (min-width: 1280px) {
      padding: 15px;
    }
  }
`;

const Button = styled.button`
  padding: 15px 20px;
  background-color: #04ab04;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: green;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 1280px) {
    padding: 20px 25px;
  }
`;

const Title = styled.h2`
  margin-bottom: 30px;
  text-align: center;
  font-size: 2.5rem;

  @media (max-width: 360px) {
    font-size: 2rem;
  }
`;

const QuillEditor = styled(ReactQuill)`
  margin-bottom: 15px;
  .ql-container {
    min-height: 200px;
  }

  @media (min-width: 1280px) {
    .ql-container {
      min-height: 300px;
    }
  }
`;

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const {currentUser} = useContext(UserContext)
  const token = currentUser?.token;

  //redirect to login page for any user who isn't logged in 

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  }, [])

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image'
  ];

  const POST_CATEGORIES = [
    "Agriculture",
    "Business",
    "Education",
    "Entertainment",
    "Art",
    "Investment",
    "Uncategorized",
    "Weather"
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí se manejaría la lógica para crear el post
    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    postData.set('thumbnail', thumbnail);

    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, postData, {withCredentials: true, headers : {Authorization:`Bearer ${token}`}})
      if(response.status == 201){
        return navigate('/')
      }
    } catch(err){
      setError(err.response.data.message)
    }

    // Reset form
    setTitle('');
    setCategory('Uncategorized');
    setDescription('');
    setThumbnail('');
  };

  return (
    <CreatePostContainer>
      <Title>Crear Publicación</Title>
      {error && <p className='error'>{error}</p> }
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Select value={category} onChange={e => setCategory(e.target.value)}>
          {
            POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
          }
        </Select>
        <QuillEditor
          modules={modules}
          formats={formats}
          value={description}
          onChange={setDescription}
        />
        <Input
          type="text"
          placeholder="URL de la Imagen o :"
          value={thumbnail}
          onChange={e => setThumbnail(e.target.value)}
          style={{ borderColor: '#04ab04', boxShadow: '0 0 8px rgba(4, 171, 4, 0.3)' }}
        />
        <FileInputContainer>
          <label htmlFor="file-upload">Seleccionar archivo</label>
          <input
            type="file"
            id="file-upload"
            onChange={e => setThumbnail(e.target.files[0])}
            accept='image/png, image/jpg, image/jpeg, image/webp'
            style={{ borderColor: '#04ab04', boxShadow: '0 0 8px rgba(4, 171, 4, 0.3)' }}
          />
        </FileInputContainer>
        <Button type="submit">Crear Publicación</Button>
      </Form>
    </CreatePostContainer>
  );
}

export default CreatePost;
