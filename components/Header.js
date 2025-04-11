import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  useTheme
} from '@mui/material';
import ThemeToggle from './ThemeToggle';
import DonationButton from './DonationButton';

const Header = () => {
  const theme = useTheme();

  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: theme.palette.primary.main
      }}
    >
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 'bold' 
          }}
        >
          PredicaHoy
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <DonationButton />
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

