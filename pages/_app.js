import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ThemeContextProvider } from '../contexts/ThemeContext';
import { SermonContextProvider } from '../contexts/SermonContext';
import createEmotionCache from '../utils/createEmotionCache';
import '../styles/globals.css';  // Asegúrate de que esta línea esté presente

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeContextProvider>
        {(theme) => (
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SermonContextProvider>
              <Component {...pageProps} />
            </SermonContextProvider>
          </ThemeProvider>
        )}
      </ThemeContextProvider>
    </CacheProvider>
  );
}
