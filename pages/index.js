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
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <SermonForm />
        
        {(currentSermon || loadingSermon) && (
          <SermonOutput 
            sermon={currentSermon} 
            loading={loadingSermon} 
          />
        )}
        
        <History />
      </Container>
    </Layout>
  );
}
