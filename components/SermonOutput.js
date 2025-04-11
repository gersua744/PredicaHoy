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
import PrintIcon from '@mui/icons-material/Print';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const SermonOutput = ({ sermon, loading }) => {
  const [copied, setCopied] = useState(false);
  const sermonRef = useRef(null);
  const theme = useTheme();
  
  if (loading) {
    return (
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Skeleton variant="text" height={60} />
        <Skeleton variant="text" height={30} />
        <Skeleton variant="text" height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
        <Skeleton variant="text" height={40} />
        <Skeleton variant="rectangular" height={100} />
      </Paper>
    );
  }
  
  if (!sermon) return null;
  
  const handleCopyClick = () => {
    // Extraer solo el texto del sermón sin etiquetas HTML
    const tempElement = document.createElement('div');
    tempElement.innerHTML = sermon.content;
    const textContent = tempElement.textContent || tempElement.innerText;
    
    navigator.clipboard.writeText(textContent).then(() => {
      setCopied(true);
    });
  };
  
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${sermon.title || 'Sermón generado'}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
            h1 { text-align: center; margin-bottom: 8px; }
            .verse { text-align: center; font-style: italic; margin-bottom: 24px; }
            h2 { margin-top: 24px; color: #333; }
            p { margin-bottom: 16px; }
          </style>
        </head>
        <body>
          ${sermon.content}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
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
      className="sermon-output"
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2
      }}
    >
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
          sx={{
            borderColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined,
            color: theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined
          }}
        >
          Copiar
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{
            borderColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined,
            color: theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined
          }}
        >
          Imprimir
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          onClick={handleDownloadPDF}
          sx={{
            borderColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined,
            color: theme.palette.mode === 'dark' ? theme.palette.primary.main : undefined
          }}
        >
          Descargar PDF
        </Button>
      </Box>
      
      <Snackbar
        open={copied}
        autoHideDuration={3000}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          sx={{ 
            width: '100%',
            bgcolor: theme.palette.mode === 'dark' ? theme.palette.success.dark : theme.palette.success.light,
            color: theme.palette.mode === 'dark' ? 'white' : 'inherit'
          }}
        >
          ¡Sermón copiado al portapapeles!
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default SermonOutput;
