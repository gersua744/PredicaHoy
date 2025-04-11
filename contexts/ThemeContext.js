import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

// Colores base para los temas
const lightThemeColors = {
  primary: {
    main: '#3f51b5',
  },
  secondary: {
    main: '#f50057',
  },
};

const darkThemeColors = {
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
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.7)',
  },
};

// Contexto para el tema
const ThemeContext = createContext({ 
  toggleColorMode: () => {},
  theme: null
});

// Hook personalizado para usar el contexto
export const useThemeContext = () => useContext(ThemeContext);

// Proveedor del contexto de tema
export const ThemeContextProvider = ({ children }) => {
  // Verifica si estamos en el navegador y si hay una preferencia guardada
  const isBrowser = typeof window !== 'undefined';
  const storedMode = isBrowser ? localStorage.getItem('themeMode') : 'light';
  
  // Estado para el modo actual (claro/oscuro)
  const [mode, setMode] = useState(storedMode || 'light');
  
  // Efecto para guardar la preferencia en localStorage
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('themeMode', mode);
    }
  }, [mode, isBrowser]);
  
  // Función para alternar entre modos
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  // Crea el objeto de tema basado en el modo actual
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light' ? lightThemeColors : darkThemeColors),
        },
      }),
    [mode],
  );
  
  return (
    <ThemeContext.Provider value={{ toggleColorMode, theme }}>
      {typeof children === 'function' ? children(theme) : children}
    </ThemeContext.Provider>
  );
};
