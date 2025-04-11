import React from 'react';
import { Box, useTheme } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      bgcolor: theme.palette.background.default
    }}>
      <Header />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          py: 4
        }}
      >
        {children}
      </Box>
      
      <Footer />
    </Box>
  );
};

export default Layout;
