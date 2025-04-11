import React from 'react';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Box,
  useTheme,
  Tooltip
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSermonContext } from '../contexts/SermonContext';

const History = () => {
  // Obtiene el historial de sermones y funciones del contexto
  const { sermonHistory, restoreSermon, removeFromHistory } = useSermonContext();
  // Obtiene el tema actual para estilos
  const theme = useTheme();
  
  // Si no hay historial, no renderiza nada
  if (!sermonHistory || sermonHistory.length === 0) {
    return null;
  }
  
  // Formato de fecha para mostrar
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (e) {
      return 'Fecha desconocida';
    }
  };
  
  return (
    <Paper 
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Historial de sermones
      </Typography>
      
      <Divider sx={{ mb: 2 }} />
      
      <List>
        {sermonHistory.map((sermon, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={sermon.title || 'Sermón sin título'}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {sermon.metadata?.topic || 'Tema no especificado'}
                    </Typography>
                    {' — '}
                    {sermon.metadata?.verse && (
                      <Typography component="span" variant="body2">
                        {sermon.metadata.verse} • 
                      </Typography>
                    )}
                    <Typography component="span" variant="body2">
                      {sermon.metadata?.date ? formatDate(sermon.metadata.date) : ''}
                    </Typography>
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                <Tooltip title="Restaurar sermón">
                  <IconButton 
                    edge="end" 
                    aria-label="restore"
                    onClick={() => restoreSermon(sermon)}
                    sx={{ mr: 1 }}
                  >
                    <RestoreIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar del historial">
                  <IconButton 
                    edge="end" 
                    aria-label="delete"
                    onClick={() => removeFromHistory(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            {index < sermonHistory.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default History;
