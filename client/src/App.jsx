// App.jsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './main';  // Importando desde main.jsx

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
