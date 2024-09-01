import axios from 'axios';

// Configuração padrão do axios
const api = axios.create({
  baseURL: 'http://localhost:1537', // URL do backend
  withCredentials: true, // Necessário se for enviar cookies ou autenticação
});

export default api;
