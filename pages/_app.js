import React from 'react';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ThemeContextProvider } from '../contexts/ThemeContext';
import { SermonContextProvider } from '../contexts/SermonContext';
import createEmotionCache from '../utils/createEmotionCache';
import '../styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>PredicaHoy - Generador de Sermones</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Generador de sermones cristianos personalizados" />
      </Head>
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
