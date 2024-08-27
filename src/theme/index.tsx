import { createTheme } from '@mui/material/styles';
import { red, green, amber } from '@mui/material/colors';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2c36f5', // Azul primário
    },
    secondary: {
      main: '#4caf50', // Rosa secundário
    },
    success: {
      main: '#4caf50', // Verde para sucesso
    },
    error: {
      main: '#f44336', // Vermelho para perigo
    },
    warning: {
      main: amber[500], // Âmbar para alerta
    },
    background: {
      default: '#f0efef', // Fundo branco puro
      paper: '#f4f4f4',   // Fundo de papel um pouco mais escuro
    },
    text: {
      primary: '#212121', // Texto preto para boa legibilidade
      secondary: '#757575', // Texto cinza para contraste
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fa0202', // Vermelho primário
    },
    secondary: {
      main: '#4caf50', // Verde água secundário
    },
    success: {
      main: '#4caf50', // Verde para sucesso
    },
    error: {
      main: '#f44336', // Vermelho para perigo
    },  
    warning: {
      main: amber[500], // Âmbar para alerta
    },
    background: {
      default: '#121212', // Fundo quase preto
      paper: '#1e1e1e',   // Fundo de papel um pouco mais claro
    },
    text: {
      primary: '#e0e0e0', // Texto branco claro
      secondary: '#b0b0b0', // Texto cinza claro
    },
  },
});

export { lightTheme, darkTheme };
