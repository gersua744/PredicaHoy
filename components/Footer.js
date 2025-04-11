import React from 'react';
import { Box, Typography, Link, Divider, Container, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const year = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'light' 
          ? theme.palette.grey[200] 
          : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        <Divider sx={{ mb: 3 }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'flex-start' }
        }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              PredicaHoy
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Generador de sermones para la comunidad cristiana
            </Typography>
          </Box>
          
          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
            <Typography variant="body2" gutterBottom>
              ¿Te gusta nuestra herramienta?
            </Typography>
            <Link href="#donate" color="primary" underline="hover">
              Apoya nuestro ministerio
            </Link>
          </Box>
        </Box>
        
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {year} PredicaHoy. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

