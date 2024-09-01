import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

// Interface para o tipo de dados do usuário
interface User {
  name: string;
  email: string;
  id: string;
}

// Interface para o contexto de autenticação
interface AuthContextData {
  jwt: string | null;
  user: User | null;
  login: (jwt: string, user: User) => void;
  logout: () => void;
}

// Criação do contexto de autenticação
const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Componente provedor do contexto de autenticação
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [jwt, setJwt] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Efeito para carregar dados do sessionStorage ao montar o componente
  useEffect(() => {
    const storedJwt = sessionStorage.getItem('jwt');
    const storedUser = sessionStorage.getItem('user');

    if (storedJwt) {
      setJwt(storedJwt);
    }
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Executa apenas uma vez ao montar o componente

  // Função para realizar o login (armazenar JWT e dados do usuário)
  const login = (jwt: string, user: User) => {
    setJwt(jwt);
    setUser(user);
    sessionStorage.setItem('jwt', jwt); // Armazena o JWT no sessionStorage
    sessionStorage.setItem('user', JSON.stringify(user)); // Armazena os dados do usuário no sessionStorage
  };

  // Função para realizar o logout (limpar JWT e dados do usuário)
  const logout = () => {
    setJwt(null);
    setUser(null);
    sessionStorage.removeItem('jwt'); // Remove o JWT do sessionStorage
    sessionStorage.removeItem('user'); // Remove os dados do usuário do sessionStorage
  };

  return (
    <AuthContext.Provider value={{ jwt, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para acessar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
