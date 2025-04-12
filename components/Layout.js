import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  // Movemos la obtención del contexto aquí
  const { toggleColorMode } = useThemeContext();
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Header toggleColorMode={toggleColorMode} />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
