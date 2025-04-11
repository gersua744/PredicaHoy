import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const theme = useTheme();
  const { toggleColorMode } = useThemeContext();
  
  return (
    <Tooltip title={theme.palette.mode === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}>
      <IconButton onClick={toggleColorMode} color="inherit" aria-label="toggle theme">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
