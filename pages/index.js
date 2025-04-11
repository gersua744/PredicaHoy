import React from 'react';
import Head from 'next/head';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import Layout from '../components/Layout';
import SermonForm from '../components/SermonForm';
import SermonOutput from '../components/SermonOutput';
import History from '../components/History';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>PredicaHoy - Generador de Sermones</title>
        <meta name="description" content="Generador de sermones cristianos" />
      </Head>
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Título y descripción */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Generador de Sermones Cristianos
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '3xl', mx: 'auto' }}>
            Bienvenido a PredicaHoy, la herramienta que te ayuda a crear sermones cristianos de manera rápida y personalizada. 
            Simplemente completa el formulario con tus requisitos y genera un sermón a medida.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {/* Columna izquierda - Formulario */}
          <Grid item xs={12} md={5}>
            <SermonForm />
            <History />
          </Grid>
          
          {/* Columna derecha - Resultado */}
          <Grid item xs={12} md={7}>
            <SermonOutput />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
