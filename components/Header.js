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
import BookIcon from '@mui/icons-material/Book';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DonationModal from './DonationModal';

// No importamos useThemeContext aquí para evitar el error
// import { useThemeContext } from '../contexts/ThemeContext';

const Header = ({ toggleColorMode }) => { // Recibimos toggleColorMode como prop
  const theme = useTheme();
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const handleDonateClick = () => {
    setDonationModalOpen(true);
  };

  return (
    <>
      <AppBar 
        position="static" 
        elevation={3}
        sx={{ 
          py: 2,
          bgcolor: theme.palette.mode === 'light' ? 'white' : 'grey.800',
          color: theme.palette.mode === 'light' ? 'grey.800' : 'white'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <BookIcon sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
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
                size="medium"
                startIcon={<FavoriteIcon />}
                onClick={handleDonateClick}
                sx={{ 
                  borderRadius: 50,
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  bgcolor: '#ec4899', // Color rosa como en el demo
                  '&:hover': {
                    bgcolor: '#db2777', // Color rosa más oscuro al hover
                  },
                  fontWeight: 500,
                  boxShadow: '0 4px 6px -1px rgba(236, 72, 153, 0.3)'
                }}
              >
                Donar
              </Button>
              
              <IconButton 
                onClick={toggleColorMode}
                sx={{ 
                  p: 1.5, 
                  bgcolor: theme.palette.mode === 'light' ? 'grey.200' : 'grey.700',
                  borderRadius: '50%'
                }}
              >
                {theme.palette.mode === 'light' ? 
                  <Brightness4Icon /> : 
                  <Brightness7Icon sx={{ color: 'yellow.500' }} />
                }
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      {/* Modal de donaciones */}
      <DonationModal 
        open={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
      />
    </>
  );
};

export default Header;
