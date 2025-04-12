const React = require('react');
const { useState, useContext } = React;
const { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton,
  Container,
  useTheme
} = require('@mui/material');
const BookIcon = require('@mui/icons-material/Book').default;
const FavoriteIcon = require('@mui/icons-material/Favorite').default;
const LightModeIcon = require('@mui/icons-material/LightMode').default;
const DarkModeIcon = require('@mui/icons-material/DarkMode').default;
const { ColorModeContext } = require('../pages/_app');
const DonationModal = require('./DonationModal');

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [donationModalOpen, setDonationModalOpen] = useState(false); // Corregido aquí

  const handleDonateClick = () => {
    setDonationModalOpen(true);
  };

  return (
    <>
      <AppBar 
        position="static" 
        elevation={1}
        sx={{ 
          py: 1,
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: 64 }}>
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <BookIcon sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
              <Typography variant="h6" component="h1" fontWeight="bold">
                PredicaHoy
              </Typography>
            </Box>
            
            <Box sx={{ flexGrow: 1 }} />
            
            {/* Botones de acción */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                  bgcolor: '#ec4899',
                  '&:hover': {
                    bgcolor: '#db2777',
                  },
                  fontWeight: 500,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                Donar
              </Button>
              
              <IconButton 
                onClick={colorMode?.toggleColorMode} // Usar el operador ? para evitar errores
                sx={{ 
                  p: 1, 
                  ml: 1,
                  bgcolor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.800',
                  color: theme.palette.mode === 'light' ? 'grey.700' : 'grey.300',
                  borderRadius: '50%'
                }}
              >
                {theme.palette.mode === 'light' ? 
                  <DarkModeIcon /> : 
                  <LightModeIcon />
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

module.exports = Header;
