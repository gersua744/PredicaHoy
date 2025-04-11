import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// Definir colores personalizados como en el original
const themeColors = {
  light: {
    primary: '#3b82f6',    // blue
    primaryDark: '#2563eb',
    secondary: '#ec4899',  // pink
    secondaryDark: '#db2777',
    text: '#1f2937',
    background: '#ffffff',
    card: '#f9fafb',
    grey: {
      200: '#e5e7eb',
      700: '#374151',
    }
  },
  dark: {
    primary: '#3b82f6',    // blue
    secondary: '#ec4899',  // pink
    text: '#f3f4f6',
    background: '#111827',
    card: '#1f2937',
    grey: {
      200: '#374151',
      700: '#4b5563',
    }
  }
};

// Crear el contexto
const ThemeContext = createContext({
  toggleColorMode: () => {},
  theme: null
});

// Hook personalizado para usar el contexto
export const useThemeContext = () => useContext(ThemeContext);

// Proveedor del contexto
export const ThemeContextProvider = ({ children }) => {
  // Obtener el tema guardado o usar 'light' por defecto
  const [mode, setMode] = useState('light');
  
  // Cargar tema guardado cuando se inicia
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setMode(savedTheme);
    // Aplicar clase al body para estilos globales
    document.body.classList.add(savedTheme);
  }, []);
  
  // Función para cambiar el tema
  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      
      // Guardar en localStorage
      localStorage.setItem('theme', newMode);
      
      // Actualizar clases en el body
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(newMode);
      
      return newMode;
    });
  };
  
  // Crear tema de Material UI basado en el modo
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: {
          main: mode === 'light' ? themeColors.light.primary : themeColors.dark.primary,
        },
        secondary: {
          main: mode === 'light' ? themeColors.light.secondary : themeColors.dark.secondary,
        },
        background: {
          default: mode === 'light' ? themeColors.light.background : themeColors.dark.background,
          paper: mode === 'light' ? themeColors.light.card : themeColors.dark.card,
        },
        text: {
          primary: mode === 'light' ? themeColors.light.text : themeColors.dark.text,
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: 8,
            },
          },
        },
      },
    });
  }, [mode]);
  
  return (
    <ThemeContext.Provider value={{ toggleColorMode, theme }}>
      {typeof children === 'function' ? children(theme) : children}
    </ThemeContext.Provider>
  );
};

