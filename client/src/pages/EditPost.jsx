import React, { useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

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


  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí se manejaría la lógica para crear el post
    console.log({ title, category, description, thumbnail });
    // Reset form
    setTitle('');
    setCategory('Uncategorized');
    setDescription('');
    setThumbnail('');
  };

  return (
    <CreatePostContainer>
      <h2>Edit Post</h2>
      <Form onSubmit={handleSubmit}>
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
        <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
          <input type="file" onChange={e=> setThumbnail(e.target.files[0]) } accept='png, jpg, jpeg'/>
          
        <Button type="submit">Update</Button>
      </Form>
    </CreatePostContainer>
  );
}

export default EditPost;
