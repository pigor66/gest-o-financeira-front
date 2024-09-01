// pages/index.tsx

import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const App: React.FC = () => {
  const { jwt, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!jwt|| !user) {
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  }, [jwt, router]);

  return null;
};

export default App;
