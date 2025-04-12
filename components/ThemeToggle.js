import React, { useContext } from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../pages/_app';

const ThemeToggle = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  
  return (
    <Tooltip title={theme.palette.mode === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}>
      <IconButton 
        onClick={colorMode.toggleColorMode} 
        color="inherit" 
        aria-label="toggle theme" 
        size="large"
        sx={{ 
          p: 1.5, 
          bgcolor: theme.palette.mode === 'light' ? 'grey.200' : 'grey.700',
          borderRadius: '50%'
        }}
      >
        {theme.palette.mode === 'dark' ? 
          <Brightness7Icon sx={{ color: 'yellow.500' }} /> : 
          <Brightness4Icon />
        }
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
