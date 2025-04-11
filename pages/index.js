import { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Container, Typography, Button } from '@mui/material';

export default function Home() {
  const [mode, setMode] = useState('light');
  const theme = createTheme({ palette: { mode } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ padding: 4 }}>
        <Typography variant="h3" gutterBottom>
          Generador de Sermones - PredicaHoy
        </Typography>
        <Button variant="contained" onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
          Cambiar a modo {mode === 'light' ? 'oscuro' : 'claro'}
        </Button>
        <Typography variant="body1" sx={{ marginTop: 4 }}>
          Aquí podrás generar sermones automáticamente. Pronto añadiremos opciones para ingresar el tema, versículo y formato.
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
