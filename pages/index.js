import React from 'react';
import { Container } from '@mui/material';
import Layout from '../components/Layout';
import SermonForm from '../components/SermonForm';
import SermonOutput from '../components/SermonOutput';
import History from '../components/History';
import { useSermonContext } from '../contexts/SermonContext';

export default function Home() {
  const { currentSermon, loadingSermon } = useSermonContext();

  return (
    <Layout>
      <Container maxWidth="lg">
        {/* Formulario para generar sermones */}
        <SermonForm />
        
        {/* Muestra el sermón generado o el estado de carga */}
        {(currentSermon || loadingSermon) && (
          <SermonOutput 
            sermon={currentSermon} 
            loading={loadingSermon} 
          />
        )}
        
        {/* Historial de sermones generados */}
        <History />
      </Container>
    </Layout>
  );
}
