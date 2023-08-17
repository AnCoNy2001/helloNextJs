'use client'

import { Box, Typography } from '@mui/material';
import React from 'react'

const Footer: React.FC = ({ }) => {
  return (
    <Box sx={{ backgroundColor: '#ddd', padding: '5px 0', textAlign: 'center' }}>
      <Typography>Next js 2023</Typography>
    </Box>
  );
};

export default Footer;
