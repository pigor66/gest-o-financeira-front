import { FormProps, LoginFormData } from '@/types/auth';
import React, { useState } from 'react';
import { TextField, Button, Typography, Box, FormControl, IconButton, Input, InputAdornment, InputLabel, FormGroup } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';

const LoginForm: React.FC<FormProps<LoginFormData>> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <FormGroup onSubmit={handleSubmit} sx={{  minWidth:380, mx: 'auto', p: 1 }}>
      <Typography variant="h4" component="h2" gutterBottom textAlign={'center'}>
        Entrar
      </Typography>

      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth style={{ marginTop: '2rem' }} >
        Enviar
      </Button>
    </FormGroup>
  );
};

export default LoginForm;
