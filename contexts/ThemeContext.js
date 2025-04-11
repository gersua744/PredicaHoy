import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

// Colores exactos para el tema
const lightTheme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
};

const darkTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
  },
};

const ThemeContext = createContext({ 
  toggleColorMode: () => {},
  theme: null
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light');
  
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);
  
  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };
  
  const theme = useMemo(
    () => createTheme(mode === 'light' ? lightTheme : darkTheme),
    [mode],
  );
  
  return (
    <ThemeContext.Provider value={{ toggleColorMode, theme }}>
      {typeof children === 'function' ? children(theme) : children}
    </ThemeContext.Provider>
  );
};
