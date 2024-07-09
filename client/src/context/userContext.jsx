import { createContext, useEffect, useState } from 'react';

// Creando el contexto de usuario
export const UserContext = createContext();

// Componente proveedor de contexto de usuario
const UserProvider = ({ children }) => {
  // Estado para almacenar el usuario actual
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

  // Efecto para guardar el usuario en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]); // Dependencia del efecto, se ejecuta cada vez que currentUser cambia

  // Retorna el proveedor de contexto con el valor actual del usuario y la función para actualizarlo
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
