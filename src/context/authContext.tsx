import React, { ReactNode, createContext, useContext, useState } from 'react';

// Interface para o tipo de dados do usuário
interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
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

  // Função para realizar o login (armazenar JWT e dados do usuário)
  const login = (jwt: string, user: User) => {
    setJwt(jwt);
    setUser(user);
  };

  // Função para realizar o logout (limpar JWT e dados do usuário)
  const logout = () => {
    setJwt(null);
    setUser(null);
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
