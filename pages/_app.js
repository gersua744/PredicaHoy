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

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  
  // Estado para controlar el modo (tema claro/oscuro)
  const [mode, setMode] = React.useState('light');
  
  // Determina el tema inicial basado en localStorage y preferencias del sistema
  React.useEffect(() => {
    // Verificar si es el modo oscuro del sistema
    const prefersDarkMode = 
      typeof window !== 'undefined' ? 
      window.matchMedia('(prefers-color-scheme: dark)').matches : 
      false;
    
    // Obtener el modo del tema del localStorage o usar el predeterminado
    const storedThemeMode = 
      typeof window !== 'undefined' ? 
      localStorage.getItem('themeMode') : 
      null;
    
    setMode(storedThemeMode || (prefersDarkMode ? 'dark' : 'light'));
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
  
  // Crear el tema basado en el modo actual
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#3b82f6', // Azul
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
            default: mode === 'light' ? '#f8fafc' : '#0f172a',
            paper: mode === 'light' ? '#ffffff' : '#1e293b',
          },
          text: {
            primary: mode === 'light' ? '#0f172a' : '#f1f5f9',
            secondary: mode === 'light' ? '#4b5563' : '#cbd5e1',
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
                borderRadius: 8,
                boxShadow: 'none',
                fontWeight: 500,
                '&:hover': {
                  boxShadow: mode === 'light' ? 
                    '0 3px 6px rgba(0, 0, 0, 0.1)' : 
                    '0 3px 6px rgba(0, 0, 0, 0.2)',
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 12,
              },
            },
          },
        },
      }),
    [mode],
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
