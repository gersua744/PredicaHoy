import React from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CreateIcon from '@mui/icons-material/Create';
import { useSermonContext } from '../contexts/SermonContext';

const SermonOutput = () => {
  const { currentSermon, loadingSermon } = useSermonContext();

  const handleCopy = () => {
    // Lógica para copiar
    console.log('Copy clicked');
  };

  const handlePdf = () => {
    // Lógica para generar PDF
    console.log('PDF clicked');
  };

  return (
    <Paper 
      elevation={4} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        minHeight: 600
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="600">
          Tu Sermón
        </Typography>
        
        {currentSermon && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopy}
              sx={{ px: 1.5, py: 0.5, fontSize: 13 }}
            >
              Copiar
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              startIcon={<PictureAsPdfIcon />}
              onClick={handlePdf}
              sx={{ px: 1.5, py: 0.5, fontSize: 13 }}
            >
              PDF
            </Button>
          </Box>
        )}
      </Box>

      {loadingSermon ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10 }}>
          <Box 
            sx={{ 
              width: 48, 
              height: 48, 
              borderRadius: '50%', 
              border: '2px solid',
              borderColor: 'primary.main',
              borderTopColor: 'transparent',
              mb: 3,
              animation: 'spin 1s linear infinite'
            }} 
          />
          <Typography color="text.secondary" align="center">
            Generando tu sermón...<br />
            Esto puede tomar unos momentos.
          </Typography>
          <style jsx global>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </Box>
      ) : currentSermon ? (
        <Box sx={{ overflow: 'auto' }}>
          {/* Contenido del sermón */}
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            {currentSermon.title}
          </Typography>
          
          {currentSermon.verse && (
            <Typography 
              variant="body2" 
              align="center" 
              color="text.secondary" 
              sx={{ fontStyle: 'italic', mb: 3 }}
            >
              "{currentSermon.verse}"
            </Typography>
          )}
          
          {/* Aquí iría el resto del contenido del sermón estructurado */}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 10 }}>
          <CreateIcon sx={{ fontSize: 64, color: 'grey.300', mb: 3 }} />
          <Typography color="text.secondary" align="center">
            Tu sermón generado aparecerá aquí.<br />
            Completa el formulario para comenzar.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default SermonOutput;

