import React, { useState } from 'react';
import { Alert, AlertTitle, Backdrop, Box, Button, Card, CardContent, CircularProgress, Grid, Snackbar } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import LoginForm from '@/components/loginForm';
import RegisterForm from '@/components/registerForm';
import { useAuth } from '@/context/authContext';
import { LoginFormData, RegisterFormData } from '@/types/auth';
import api from '../api/api';

const AuthPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(true); // Estado para alternar entre login e registro
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    if (!data.email) {
      setError('Preencha o email para continuar');
      setOpen(true);
      setIsLoading(false);
      return;
    }
    if (!data.password) {
      setError('Preencha a senha para continuar');
      setOpen(true);
      setIsLoading(false);
      return;
    }
    try {
      const response = await api.post('/api/auth/login', data);
      console.log('Login bem-sucedido:', response.data);
      login(response.data.access_token, response.data.user);

      if (response.status === 200) {
        router.push('/dashboard');
      }
      setIsLoading(false);
    } catch (error: unknown) {


      let errorMessage = 'Erro ao enviar dados.';

      if (error.message === 'Email not confirmed') {
        errorMessage = 'Verifique seu E-mail para continuar';

      }
      if (axios.isAxiosError(error)) {

        const errorMsg = error.response?.data?.error?.message;

        if (errorMsg === 'Invalid identifier or password') {
        }
      } else {
        errorMessage = 'Erro inesperado.';
      }

      console.error('Erro ao fazer login:', errorMessage);
      setError(errorMessage);
      setOpen(true);
      setIsLoading(false);
    }

  };

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    if (!data.name || !data.email || !data.password) {
      setError('Preencha todos os campos para continuar');
      setOpen(true);
      setIsLoading(false);
      return;
    }
    try {
      const response = await api.post('/api/user', data);
      console.log('Registro bem-sucedido:', response.data);


      setIsLogin(true)
      setIsLoading(false);
    } catch (error) {
      let errorMessage = 'Erro ao enviar dados.';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || 'Erro inesperado.';
      }
      console.error('Erro ao registrar:', errorMessage);
      setError(errorMessage);
      setOpen(true);
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (data: LoginFormData | RegisterFormData) => {
    if (isLogin) {
      handleLogin(data as LoginFormData);
    } else {
      handleRegister(data as RegisterFormData);
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Grid container justifyContent={'center'} mt={'5rem'}>
      <Grid item xs={12} md={6} lg={5} xl={4}>
        <Card sx={{ mx: 'auto', p: 2, borderRadius: '1rem' }}>
          <CardContent>
            {isLogin ? (
              <LoginForm onSubmit={handleFormSubmit} />
            ) : (
              <RegisterForm onSubmit={handleFormSubmit} />
            )}
            <Box mt={2} textAlign="center">
              <Button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Não tem uma conta? Registre-se' : 'Já tem uma conta? Faça login'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar open={open} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={4000}>
        <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
          <AlertTitle>Erro</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default AuthPage;
