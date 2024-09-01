import React, { useState } from 'react';
import { TextField, Button, Typography, Box, FormControl, IconButton, Input, InputAdornment, InputLabel, FormGroup } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { FormProps, RegisterFormData } from '@/types/auth';

const RegisterForm: React.FC<FormProps<RegisterFormData>> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    onSubmit({ name, email, password });
  };

  return (
    <FormGroup onSubmit={handleSubmit} sx={{ minWidth: 380, mx: 'auto', p: 1 }}>
      <Typography variant="h4" component="h2" gutterBottom textAlign={'center'}>
        Criar uma conta
      </Typography>

      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="name">Name</InputLabel>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
        <Input
          id="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

      <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth style={{ marginTop: '2rem' }}>
        Enviar
      </Button>
    </FormGroup>
  );
};

export default RegisterForm;
