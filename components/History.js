import React from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  List, 
  ListItem, 
  Button, 
  Divider,
  useTheme 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSermonContext } from '../contexts/SermonContext';

const History = () => {
  const theme = useTheme();
  const { sermonHistory, restoreSermon, clearHistory } = useSermonContext();
  
  if (!sermonHistory || sermonHistory.length === 0) {
    return (
      <Paper 
        elevation={4} 
        sx={{ 
          p: 6, 
          borderRadius: 2,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          bgcolor: theme.palette.mode === 'light' ? 'white' : 'grey.800',
        }}
      >
        <Typography variant="h6" fontWeight="600" mb={4}>
          Historial
        </Typography>
        
        <Box sx={{ py: 8, textAlign: 'center', color: 'text.secondary' }}>
          Tu historial de sermones aparecerá aquí
        </Box>
      </Paper>
    );
  }
  
  return (
    <Paper 
      elevation={4} 
      sx={{ 
        p: 6, 
        borderRadius: 2,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        bgcolor: theme.palette.mode === 'light' ? 'white' : 'grey.800',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h6" fontWeight="600">
          Historial
        </Typography>
        
        <Button
          variant="text"
          color="error"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={clearHistory}
          sx={{ fontSize: 14, textTransform: 'none' }}
        >
          Limpiar
        </Button>
      </Box>
      
      <List sx={{ px: 0 }}>
        {sermonHistory.map((sermon, index) => {
          const date = new Date(sermon.timestamp);
          const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
          
          return (
            <React.Fragment key={index}>
              <ListItem 
                disableGutters
                sx={{ 
                  p: 3, 
                  mb: 2, 
                  border: 1, 
                  borderColor: theme.palette.mode === 'light' ? 'grey.200' : 'grey.700',
                  borderRadius: 1,
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2
                  }
                }}
                onClick={() => restoreSermon(sermon)}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography variant="subtitle1" fontWeight="500" gutterBottom>
                    {sermon.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formattedDate} - {sermon.style}, {sermon.length}
                  </Typography>
                </Box>
              </ListItem>
              {index < sermonHistory.length - 1 && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
};

export default History;
