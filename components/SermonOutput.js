import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  useTheme 
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CreateIcon from '@mui/icons-material/Create';
import { useSermonContext } from '../contexts/SermonContext';

const SermonOutput = () => {
  const theme = useTheme();
  const { currentSermon, loadingSermon } = useSermonContext();
  
  // Maneja la copia del sermón al portapapeles
  const handleCopy = () => {
    if (!currentSermon) return;
    
    // Texto que será copiado
    let sermonText = `${currentSermon.title}\n\n`;
    
    if (currentSermon.verse) {
      sermonText += `"${currentSermon.verse}"\n\n`;
    }
    
    sermonText += `INTRODUCCIÓN:\n${currentSermon.introduction}\n\n`;
    
    sermonText += `DESARROLLO:\n`;
    currentSermon.points.forEach(point => {
      sermonText += `- ${point.title}\n${point.content}\n\n`;
    });
    
    sermonText += `CONCLUSIÓN:\n${currentSermon.conclusion}\n\n`;
    
    sermonText += `APLICACIÓN PRÁCTICA:\n`;
    currentSermon.application.forEach(item => {
      sermonText += `- ${item}\n`;
    });
    
    // Copia al portapapeles
    navigator.clipboard.writeText(sermonText).then(() => {
      alert('Sermón copiado al portapapeles');
    });
  };
  
  // Maneja la descarga del sermón como PDF
  const handlePdf = () => {
    if (!currentSermon) return;
    
    import('html2canvas').then(html2canvas => {
      import('jspdf').then(({ default: jsPDF }) => {
        const input = document.querySelector('.sermon-display');
        html2canvas.default(input).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          const imgX = (pdfWidth - imgWidth * ratio) / 2;
          const imgY = 30;

          pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
          pdf.save(`${currentSermon.title.replace(/\s+/g, '_')}.pdf`);
        });
      });
    });
  };
  
  return (
    <Paper 
      elevation={4} 
      sx={{ 
        p: 6, 
        borderRadius: 2,
        minHeight: 600,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        bgcolor: theme.palette.mode === 'light' ? 'white' : 'grey.800',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h6" fontWeight="600">
          Tu Sermón
        </Typography>
        
        {currentSermon && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ContentCopyIcon />}
              onClick={handleCopy}
              sx={{ 
                borderColor: theme.palette.mode === 'light' ? 'grey.300' : 'grey.600',
                color: theme.palette.mode === 'light' ? 'grey.700' : 'grey.300',
                '&:hover': {
                  borderColor: theme.palette.mode === 'light' ? 'grey.400' : 'grey.500',
                  bgcolor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.700'
                }
              }}
            >
              Copiar
            </Button>
            <Button
              variant="outlined"
              size="small"
              startIcon={<PictureAsPdfIcon />}
              onClick={handlePdf}
              sx={{ 
                borderColor: theme.palette.mode === 'light' ? 'grey.300' : 'grey.600',
                color: theme.palette.mode === 'light' ? 'grey.700' : 'grey.300',
                '&:hover': {
                  borderColor: theme.palette.mode === 'light' ? 'grey.400' : 'grey.500',
                  bgcolor: theme.palette.mode === 'light' ? 'grey.100' : 'grey.700'
                }
              }}
            >
              PDF
            </Button>
          </Box>
        )}
      </Box>
      
      {loadingSermon ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 16 }}>
          <Box 
            sx={{ 
              width: 48, 
              height: 48, 
              borderRadius: '50%', 
              border: '2px solid',
              borderColor: 'primary.main',
              borderTopColor: 'transparent',
              mb: 4,
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
        <Box className="sermon-display">
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            {currentSermon.title}
          </Typography>
          
          {currentSermon.verse && (
            <Typography 
              variant="body1" 
              align="center" 
              color="text.secondary" 
              sx={{ fontStyle: 'italic', mb: 4 }}
            >
              "{currentSermon.verse}"
            </Typography>
          )}
          
          <Box sx={{ mb: 6 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center',
                gap: 3, 
                fontSize: 14,
                color: 'text.secondary',
                mb: 2
              }}
            >
              <Typography component="span" variant="body2">
                Estilo: {currentSermon.style}
              </Typography>
              <Typography component="span" variant="body2">
                Longitud: {currentSermon.length}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" fontWeight="600" gutterBottom>
              Introducción
            </Typography>
            <Typography paragraph>
              {currentSermon.introduction}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" fontWeight="600" gutterBottom>
              Desarrollo
            </Typography>
            {currentSermon.points.map((point, index) => (
              <Box key={index} sx={{ mb: 4 }}>
                <Typography variant="h6" fontWeight="500" gutterBottom>
                  {point.title}
                </Typography>
                <Typography paragraph>
                  {point.content}
                </Typography>
              </Box>
            ))}
          </Box>
          
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" fontWeight="600" gutterBottom>
              Conclusión
            </Typography>
            <Typography paragraph>
              {currentSermon.conclusion}
            </Typography>
          </Box>
          
          <Box sx={{ mt: 8, pt: 4, borderTop: 1, borderColor: 'divider' }}>
            <Typography variant="h5" fontWeight="600" gutterBottom>
              Aplicación Práctica
            </Typography>
            <Box component="ul" sx={{ pl: 5, '& li': { mb: 2 } }}>
              {currentSermon.application.map((item, index) => (
                <li key={index}>
                  <Typography>{item}</Typography>
                </li>
              ))}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 16 }}>
          <CreateIcon sx={{ fontSize: 64, color: theme.palette.mode === 'light' ? 'grey.300' : 'grey.600', mb: 4 }} />
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
