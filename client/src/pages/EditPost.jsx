  import React, { useState, useContext, useEffect } from 'react';
  import 'react-quill/dist/quill.snow.css'; 
  import ReactQuill from 'react-quill';
  import {UserContext} from '../context/userContext'
  import {useNavigate,useParams} from 'react-router-dom'
  import axios from 'axios';
  import styled from 'styled-components';


  // Styled components
  const CreatePostContainer = styled.section`
    padding: 20px;
  `;

  const Form = styled.form`
    display: flex;
    flex-direction: column;
  `;

  const Input = styled.input`
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  `;

  const Textarea = styled.textarea`
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  `;

  const Select = styled.select`
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  `;

  const Button = styled.button`
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  `;

  const EditPost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Uncategorized');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');


    const navigate = useNavigate()
    const {id} = useParams();

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
      [{'header': [1,2,3,4,5,6, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote' ],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'ident': '-1'}, {'ident': '+1'},]
      ['link', 'image'],
      ['clean']
    ],
  }


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

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description)
     
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, []);



  const editPost = async (event) => {
    event.preventDefault();
    
    if (!title || !description || !category) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
  
    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    
    if (thumbnail) {
      if (thumbnail instanceof File) {
        postData.set('thumbnail', thumbnail);
      } else {
        postData.set('thumbnail', thumbnail);
      }
    }
  
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/posts/${id}`,
        postData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error('Error al actualizar el post:', error);
      alert('Hubo un error al actualizar el post.');
    }
  };
  

    return (
      <CreatePostContainer>
        <h2>Edit Post</h2>
        <Form onSubmit={editPost}>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <Select value={category} onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}  </option> )
            }

          
          </Select>
          <Textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows="5"
          />
          <Input
            type="text"
            placeholder="Thumbnail URL"
            value={thumbnail}
            onChange={e => setThumbnail(e.target.value)}
          />
          <ReactQuill modules={modules} formats={formats} value={description}  onChange={newDescription => setDescription(newDescription)} />
            <input type="file" onChange={e=> setThumbnail(e.target.files[0]) } accept='png, jpg, jpeg'/>
            
          <Button type="submit">Update</Button>
        </Form>
      </CreatePostContainer>
    );
  }

  export default EditPost;
  /* */