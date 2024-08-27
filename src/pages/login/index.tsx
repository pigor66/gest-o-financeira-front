import LoginForm from '@/components/loginForm';
import { useAuth } from '@/context/authContext';
import { LoginFormData } from '@/types/auth';
import { Alert, AlertTitle, Backdrop, Card, CardContent, CircularProgress, Snackbar } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    if (!data.identifier) {
      setError('Preencha o email para continuar');
      setOpen(true);
      setIsLoading(false);

    }
    else if (!data.password) {
      setError('Preencha a senha para continuar');
      setOpen(true);

      setIsLoading(false);

    }
    else {
      try {
        const response = await axios.post('http://localhost:1337/api/auth/local', data);
        login(response.data.jwt, response.data.user);
        router.push('/dashboard');
      } catch (error) {
        let errorMessage = 'Erro ao enviar dados.';

        if (axios.isAxiosError(error)) {

          if (error.response?.data?.error?.message === 'Invalid identifier or password') {
            errorMessage = 'Email ou senha incorreto';
          }
        } else {
          errorMessage = 'Erro inesperado.';
        }

        setError(errorMessage);
        setOpen(true);

        console.error('Erro ao enviar dados para API:', error);
      } finally {
        setIsLoading(false);
      }

    }
  };

  const handleFormSubmit = (data: LoginFormData) => {
    handleLogin(data);
  };


  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };


  return (
    <>
      <Card sx={{  mx: 'auto', p: 2, borderRadius: '1rem' }}>
        <CardContent>
          <LoginForm onSubmit={handleFormSubmit} />
        </CardContent>
      </Card>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Snackbar open={open} onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={4000}
      >
        <Alert severity="error"
          onClose={handleClose}
          sx={{ width: '100%' }}
        >
          <AlertTitle>Erro</AlertTitle>
          {error}
        </Alert>
      </Snackbar>

    </>
  );
};

export default Login;
