import React from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { SermonContextProvider } from '../contexts/SermonContext';
import createEmotionCache from '../utils/createEmotionCache';
import '../styles/globals.css';

// Cliente-side cache compartido para toda la sesión
const clientSideEmotionCache = createEmotionCache();

// Crea un contexto para el tema directamente en _app.js
export const ColorModeContext = React.createContext({ 
  toggleColorMode: () => {} 
});

// Tema claro (basado en el demo)
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4285f4', // Azul como en el demo
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899', // Rosa como en el botón de donar
      light: '#f472b6',
      dark: '#db2777',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa', // Fondo gris claro como en el demo
      paper: '#ffffff',
    },
    text: {
      primary: '#202124', // Color de texto oscuro
      secondary: '#5f6368', // Color de texto gris
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 20, // Botones más redondeados como en el demo
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 2px 0 rgba(60, 64, 67, 0.3), 0 1px 3px 1px rgba(60, 64, 67, 0.15)',
        },
      },
    },
  },
});

// Tema oscuro (basado en el mismo estilo)
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4285f4', // Azul
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899', // Rosa
      light: '#f472b6',
      dark: '#db2777',
      contrastText: '#ffffff',
    },
    background: {
      default: '#202124', // Fondo oscuro como en modo oscuro de Google
      paper: '#303134',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bdc1c6',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 20,
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)',
        },
      },
    },
  },
});

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  
  // Estado para controlar el modo (tema claro/oscuro)
  const [mode, setMode] = React.useState('light'); // Comenzar con tema claro como en el demo
  
  // Determina el tema inicial basado en localStorage y preferencias del sistema
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Obtener el modo del tema del localStorage
      const storedThemeMode = localStorage.getItem('themeMode');
      
      if (storedThemeMode) {
        setMode(storedThemeMode);
      } else {
        // Si no hay tema guardado, usar el tema claro por defecto (como en el demo)
        setMode('light');
      }
    }
  }, []);
  
  // Función para alternar entre temas
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          // Guardar en localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('themeMode', newMode);
          }
          return newMode;
        });
      },
    }),
    [],
  );
  
  // Seleccionar tema basado en el modo
  const theme = React.useMemo(
    () => (mode === 'light' ? lightTheme : darkTheme),
    [mode]
  );

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>PredicaHoy - Generador de Sermones</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Genera sermones cristianos de manera fácil y rápida" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SermonContextProvider>
            <Component {...pageProps} />
          </SermonContextProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
}
