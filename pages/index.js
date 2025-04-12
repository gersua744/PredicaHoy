import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import Layout from '../components/Layout';
import SermonForm from '../components/SermonForm';
import SermonOutput from '../components/SermonOutput';
import History from '../components/History';

export default function Home() {
  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 8, px: { xs: 2, md: 4 } }}>
        {/* Sección de bienvenida */}
        <Box sx={{ textAlign: 'center', mb: 12 }}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Generador de Sermones Cristianos
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            Bienvenido a PredicaHoy, la herramienta que te ayuda a crear sermones cristianos de manera
            rápida y personalizada. Simplemente completa el formulario con tus requisitos y genera un
            sermón a medida.
          </Typography>
        </Box>

        {/* Contenido principal - 2 columnas */}
        <Grid container spacing={8}>
          {/* Columna izquierda - Formulario y historial */}
          <Grid item xs={12} md={5}>
            <SermonForm />
            <History />
          </Grid>
          
          {/* Columna derecha - Resultado del sermón */}
          <Grid item xs={12} md={7}>
            <SermonOutput />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

