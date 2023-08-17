import React from 'react'
import { Box } from '@mui/material';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home page',
  description: 'Description bla bla',
}

const Home: React.FC = () => {

  return (
    <div>
      <Box sx={{ marginTop: '10px', fontSize: '16px', fontWeight: '700' }} >Data Blog</Box>
    </div>
  );
};

export default Home;
