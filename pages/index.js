import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import Layout from '../components/Layout';
import SermonForm from '../components/SermonForm';
import SermonOutput from '../components/SermonOutput';
import History from '../components/History';
import { useSermonContext } from '../contexts/SermonContext';

export default function Home() {
  const { currentSermon, loadingSermon } = useSermonContext();

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Generador de Sermones Cristianos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Bienvenido a PredicaHoy, la herramienta que te ayuda a crear sermones cristianos de manera
            rápida y personalizada. Simplemente completa el formulario con tus requisitos y genera un
            sermón a medida.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {/* Columna izquierda: Formulario */}
          <Grid item xs={12} md={5}>
            <SermonForm />
            <History />
          </Grid>
          
          {/* Columna derecha: Output */}
          <Grid item xs={12} md={7}>
            {(currentSermon || loadingSermon) ? (
              <SermonOutput 
                sermon={currentSermon} 
                loading={loadingSermon} 
              />
            ) : (
              <Paper elevation={3} sx={{ p: 3, height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Tu Sermón
                </Typography>
                <Box sx={{ p: 3 }}>
                  <Typography variant="body1" paragraph>
                    Tu sermón generado aparecerá aquí.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completa el formulario para comenzar.
                  </Typography>
                </Box>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
