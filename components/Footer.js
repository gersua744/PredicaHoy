import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Button, Divider, useTheme } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DonationModal from './DonationModal';

const Footer = () => {
  const theme = useTheme();
  const year = new Date().getFullYear();
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  const handleDonateClick = () => {
    setDonationModalOpen(true);
  };

  return (
    <>
      <Box 
        component="footer" 
        sx={{ 
          py: 5,
          px: { xs: 2, md: 0 },
          mt: 8,
          bgcolor: theme.palette.mode === 'light' ? '#f1f3f4' : 'grey.900'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <BookIcon sx={{ fontSize: 24, color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" component="span" fontWeight="bold">
                  PredicaHoy
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Herramienta para la generación de sermones cristianos
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                ¿Te ha resultado útil esta herramienta?
              </Typography>
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
                  fontWeight: 500
                }}
              >
                Apoyar este ministerio
              </Button>
            </Grid>
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="body2" color="text.secondary">
              &copy; {year} PredicaHoy. Todos los derechos reservados.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Modal de donaciones */}
      <DonationModal 
        open={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
      />
    </>
  );
};

export default Footer;
