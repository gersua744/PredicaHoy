const React = require('react');
const Head = require('next/head').default;
const { CacheProvider } = require('@emotion/react');
const { ThemeProvider, CssBaseline, createTheme } = require('@mui/material');
const { SermonContextProvider } = require('../contexts/SermonContext');
const createEmotionCache = require('../utils/createEmotionCache');
require('../styles/globals.css');

// Cliente-side cache compartido para toda la sesión
const clientSideEmotionCache = createEmotionCache();

// Crea un contexto para el tema directamente en _app.js
const ColorModeContext = React.createContext({ 
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
  // Resto de configuración del tema...
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
  // Resto de configuración del tema...
});

function MyApp(props) {
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
  
  // Función para alternar entre temas - IMPORTANTE: Esto debe estar en el contexto del componente
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
    []
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

// Exporta el contexto para que pueda ser importado por otros componentes
module.exports = MyApp;
module.exports.ColorModeContext = ColorModeContext;
