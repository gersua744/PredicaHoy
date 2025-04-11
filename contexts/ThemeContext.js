import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

// Colores base para los temas
const themeOptions = {
  light: {
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
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            textTransform: 'none',
            fontWeight: 500,
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
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
  dark: {
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
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 4,
            textTransform: 'none',
            fontWeight: 500,
          },
          outlined: {
            borderColor: '#90caf9',
            color: '#90caf9',
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
      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          },
        },
      },
    },
  },
};

// Contexto para el tema
const ThemeContext = createContext({ 
  toggleColorMode: () => {},
  theme: null
});

// Hook personalizado para usar el contexto
export const useThemeContext = () => useContext(ThemeContext);

// Proveedor del contexto
export const ThemeContextProvider = ({ children }) => {
  // Verifica si estamos en el navegador
  const isBrowser = typeof window !== 'undefined';
  // Obtiene el modo guardado o usa 'light' por defecto
  const storedMode = isBrowser ? localStorage.getItem('themeMode') : 'light';
  
  // Estado para el modo actual
  const [mode, setMode] = useState(storedMode || 'light');
  
  // Efecto para aplicar clase al body y guardar preferencia
  useEffect(() => {
    if (isBrowser) {
      localStorage.setItem('themeMode', mode);
      document.body.classList.toggle('dark-mode', mode === 'dark');
    }
  }, [mode, isBrowser]);
  
  // Función para alternar entre modos
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  // Crea el objeto de tema basado en el modo actual
  const theme = useMemo(
    () => createTheme(themeOptions[mode]),
    [mode],
  );
  
  return (
    <ThemeContext.Provider value={{ toggleColorMode, theme }}>
      {typeof children === 'function' ? children(theme) : children}
    </ThemeContext.Provider>
  );
};
