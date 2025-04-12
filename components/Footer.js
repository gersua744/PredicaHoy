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
          py: 8,
          px: { xs: 2, md: 6 },
          mt: 12,
          bgcolor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.800'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                <BookIcon sx={{ fontSize: 24, color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" component="span" fontWeight="bold">
                  PredicaHoy
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Herramienta para la generación de sermones cristianos
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                ¿Te ha resultado útil esta herramienta?
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                size="small"
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
          
          <Divider sx={{ my: 6, borderColor: theme.palette.mode === 'light' ? 'grey.200' : 'grey.700' }} />
          
          <Typography variant="body2" color="text.secondary" align="center">
            &copy; {year} PredicaHoy. Todos los derechos reservados.
          </Typography>
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
