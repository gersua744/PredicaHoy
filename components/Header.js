import React, { useState } from 'react';
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Container,
  useTheme
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeContext } from '../contexts/ThemeContext';
import DonationModal from './DonationModal';

const Header = () => {
  const theme = useTheme();  // Obtiene el tema actual
  const { colorMode } = useThemeContext();  // Obtiene funciones para cambiar el tema
  const [donationModalOpen, setDonationModalOpen] = useState(false);  // Estado para controlar la visibilidad del modal

  // Función para abrir el modal de donación
  const handleDonateClick = () => {
    setDonationModalOpen(true);
  };

  return (
    <>
      <AppBar 
        position="static" 
        elevation={1}
        sx={{ 
          py: 1,  // padding vertical
          bgcolor: theme.palette.mode === 'light' ? 'white' : 'grey.900',  // Color de fondo según tema
          color: theme.palette.mode === 'light' ? 'grey.800' : 'white',     // Color de texto según tema
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 64 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MenuBookIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />  {/* Icono del logo */}
              <Typography variant="h6" component="h1" fontWeight="bold">
                PredicaHoy  {/* Nombre de la aplicación */}
              </Typography>
            </Box>
            
            <Box sx={{ flexGrow: 1 }} />  {/* Espaciador flexible */}
            
            {/* Botones de acción */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button 
                variant="contained" 
                color="secondary" 
                size="medium"
                startIcon={<FavoriteBorderIcon />}
                onClick={handleDonateClick}  /* Abre el modal de donación */
                sx={{ 
                  borderRadius: 50,   
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  fontWeight: 500
                }}
              >
                Donar  {/* Botón de donar */}
              </Button>
              
              <IconButton 
                onClick={colorMode.toggleColorMode}  /* Cambia entre tema claro y oscuro */
                sx={{ 
                  ml: 1,
                  color: theme.palette.mode === 'light' ? 'orange' : 'white'
                }}
              >
               {theme.palette.mode === 'light' ? (
                    <DarkModeIcon /> 
                  ) : (
                    <LightModeIcon />
                  )}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Modal de donaciones - se muestra solo cuando donationModalOpen es true */}
      <DonationModal 
        open={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}  /* Función para cerrar el modal */
      />
    </>
  );
};

export default Header;
