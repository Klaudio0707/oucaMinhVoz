import React, { createContext, useContext, useState } from 'react';

// Cria o contexto
const UserContext = createContext();

// Provider do contexto
export const UserProvider = ({ children }) => {
  const [users, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ users, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export const useUser = () => useContext(UserContext);
