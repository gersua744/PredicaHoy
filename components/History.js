import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemText, Button, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSermonContext } from '../contexts/SermonContext';

const History = () => {
  const { sermonHistory, restoreSermon, clearHistory } = useSermonContext();
  
  return (
    <Paper 
      elevation={4} 
      sx={{ 
        p: 3, 
        borderRadius: 2
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="600">
          Historial
        </Typography>
        
        {sermonHistory && sermonHistory.length > 0 && (
          <Button
            variant="text"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={clearHistory}
            sx={{ fontSize: 13, textTransform: 'none' }}
          >
            Limpiar
          </Button>
        )}
      </Box>
      
      {sermonHistory && sermonHistory.length > 0 ? (
        <List sx={{ px: 0 }}>
          {sermonHistory.map((sermon, index) => (
            <React.Fragment key={index}>
              <ListItem 
                sx={{ 
                  p: 2, 
                  mb: 1, 
                  border: 1, 
                  borderColor: 'grey.200',
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
                <ListItemText
                  primary={sermon.title}
                  secondary={
                    <Box component="span" sx={{ display: 'block', fontSize: 12, color: 'text.secondary' }}>
                      {new Date(sermon.timestamp).toLocaleDateString()} - {sermon.style}, {sermon.length}
                    </Box>
                  }
                />
              </ListItem>
              {index < sermonHistory.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Box sx={{ py: 4, textAlign: 'center', color: 'text.secondary' }}>
          Tu historial de sermones aparecerá aquí
        </Box>
      )}
    </Paper>
  );
};

export default History;

