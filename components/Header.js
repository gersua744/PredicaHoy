import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  useTheme, 
  Container
} from '@mui/material';
import ThemeToggle from './ThemeToggle';
import DonationButton from './DonationButton';

const Header = () => {
  const theme = useTheme();
  
  return (
    <AppBar 
      position="static" 
      color="primary"
      elevation={0}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold',
              letterSpacing: '0.5px'
            }}
          >
            PredicaHoy
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <DonationButton />
            <ThemeToggle />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;


