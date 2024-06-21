// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter } from 'react-router-dom';

import Layout from './components/Layout/Layout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import PostDetail from './pages/PostDetail.jsx';
import Logout from './pages/Logout.jsx';
import EditPost from './pages/EditPost.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AuthorPosts from './pages/AuthorPosts.jsx';
import CategoryPosts from './pages/CategoryPosts.jsx';
import CreatePost from './pages/CreatePost.jsx';
import Authors from './pages/Authors.jsx';
import UserProfile from './pages/UserProfile.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import DeletePost from './pages/DeletePost.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      // Rutas anidadas
      {index: true, element: <Home/>},
      {path: "posts/:id", element: <PostDetail/>},
      {path: "register", element: <Register/>},
      {path: "login", element: <Login/>},
      {path: "profile/:id", element: <UserProfile/>},
      {path: "authors", element: <Authors/>},
      {path: "create", element: <CreatePost/>},
      {path: "posts/categories/:category", element: <CategoryPosts/>},
      { path: "posts/users/:id", element: <AuthorPosts/> },  // Eliminado la coma extra
      { path: "myposts/:id", element: <Dashboard/> },  // Eliminado la coma extra y corregido el nombre del componente
      { path: "posts/:id/edit", element: <EditPost/> },  // Eliminado la coma extra
      { path: "posts/:id/delete", element: <DeletePost/> },  // Eliminado la coma extra
      { path: "logout", element: <Logout/> },

    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
