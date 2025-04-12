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

// Temas definidos aquí...

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  
  // Estado y efectos aquí...

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
