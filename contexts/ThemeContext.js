import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

// Definiciones exactas de temas
const getTheme = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Paleta modo claro
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
        }
      : {
          // Paleta modo oscuro
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
          text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
          },
        }),
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: '16px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

// Contexto para el tema
const ThemeContext = createContext({
  toggleColorMode: () => {},
  theme: null,
});

// Hook personalizado para acceder al contexto
export const useThemeContext = () => useContext(ThemeContext);

// Proveedor del contexto de tema
export const ThemeContextProvider = ({ children }) => {
  // Estado para el modo de color actual
  const [mode, setMode] = useState('light');

  // Efecto para cargar preferencia guardada
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('themeMode');
      if (savedMode) {
        setMode(savedMode);
      }
      
      // Aplicar clase al body para estilos globales
      document.body.classList.toggle('dark-mode', savedMode === 'dark');
    }
  }, []);

  // Función para cambiar el modo de color
  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeMode', newMode);
        document.body.classList.toggle('dark-mode', newMode === 'dark');
      }
      return newMode;
    });
  };

  // Crear tema basado en el modo actual
  const theme = useMemo(() => createTheme(getTheme(mode)), [mode]);

  return (
    <ThemeContext.Provider value={{ toggleColorMode, theme }}>
      {typeof children === 'function' ? children(theme) : children}
    </ThemeContext.Provider>
  );
};
