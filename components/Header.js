import React from 'react';
import { Box, AppBar, Toolbar, Typography, Button, IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookIcon from '@mui/icons-material/Book';
import { useThemeContext } from '../contexts/ThemeContext';

const Header = () => {
  const theme = useTheme();
  const { toggleColorMode } = useThemeContext();
  
  // Función para manejar clic en botón de donación
  const handleDonateClick = () => {
    // Aquí iría la lógica para abrir el modal de donación
    console.log('Donar clicked');
  };
  
  return (
    <AppBar 
      position="static" 
      elevation={3}
      sx={{ 
        bgcolor: theme.palette.mode === 'light' ? 'white' : 'grey.800',
        color: theme.palette.mode === 'light' ? 'grey.800' : 'white',
        py: 1
      }}
    >
      <Toolbar sx={{ px: {xs: 2, sm: 4} }}>
        {/* Logo y título */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BookIcon sx={{ color: 'primary.main', fontSize: 32, mr: 1 }} />
          <Typography variant="h5" component="h1" fontWeight="bold">
            PredicaHoy
          </Typography>
        </Box>
        
        <Box sx={{ flexGrow: 1 }} />
        
        {/* Botones de acción */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<FavoriteBorderIcon />}
            onClick={handleDonateClick}
            sx={{ borderRadius: 50, px: 2 }}
          >
            Donar
          </Button>
          
          <IconButton 
            onClick={toggleColorMode} 
            sx={{ 
              bgcolor: theme.palette.mode === 'light' ? 'grey.200' : 'grey.700',
              borderRadius: '50%'
            }}
          >
            {theme.palette.mode === 'light' ? 
              <Brightness4Icon /> : 
              <Brightness7Icon sx={{ color: 'primary.light' }} />
            }
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;



