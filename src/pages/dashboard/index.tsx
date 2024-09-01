import { useAuth } from '@/context/authContext';
import { Card, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Dashboard: React.FC = () => {

  const { jwt, user } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (!jwt || !user) {
      router.push('/login');
    }
  }, [jwt, router]);



  return (
    <Grid container spacing={3}>
      <Grid item >
        <Typography>
          Olá, {user?.name}
        </Typography>
        <Typography>
          seu email é, {user?.email}
        </Typography>
        <Typography>
          você possui o tolken de acesso {jwt}
        </Typography>
      </Grid>
    </Grid>

  );
};

export default Dashboard;
