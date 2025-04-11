import React, { useState, useRef } from 'react';
import { 
  Paper, 
  Typography, 
  Button, 
  Box, 
  Skeleton,
  Snackbar,
  Alert,
  useTheme
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const SermonOutput = ({ sermon, loading }) => {
  const [copied, setCopied] = useState(false);
  const sermonRef = useRef(null);
  const theme = useTheme();
  
  if (loading) {
    return (
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Tu Sermón
        </Typography>
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="rectangular" height={200} sx={{ my: 2 }} />
        <Skeleton variant="text" height={40} />
      </Paper>
    );
  }
  
  if (!sermon) return null;
  
  const handleCopyClick = () => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = sermon.content;
    const textContent = tempElement.textContent || tempElement.innerText;
    
    navigator.clipboard.writeText(textContent).then(() => {
      setCopied(true);
    });
  };
  
  const handleDownloadPDF = async () => {
    if (!sermonRef.current) return;
    
    const canvas = await html2canvas(sermonRef.current);
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`sermon-${new Date().toISOString().split('T')[0]}.pdf`);
  };
  
  return (
    <Paper 
      elevation={3}
      sx={{ p: 3 }}
    >
      <Typography variant="h6" gutterBottom>
        Tu Sermón
      </Typography>
      
      <div ref={sermonRef} dangerouslySetInnerHTML={{ __html: sermon.content }} />
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-end',
        mt: 3,
        gap: 2
      }}>
        <Button
          variant="outlined"
          startIcon={<ContentCopyIcon />}
          onClick={handleCopyClick}
        >
          Copiar
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleDownloadPDF}
        >
          PDF
        </Button>
      </Box>
      
      <Snackbar
        open={copied}
        autoHideDuration={3000}
        onClose={() => setCopied(false)}
      >
        <Alert 
          severity="success" 
          sx={{ width: '100%' }}
        >
          ¡Sermón copiado al portapapeles!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default SermonOutput;
