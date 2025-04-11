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
  const { sermonHistory, restoreSermon, removeFromHistory } = useSermonContext();
  const theme = useTheme();
  
  if (!sermonHistory || sermonHistory.length === 0) {
    return null;
  }
  
  return (
    <Paper 
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        Historial de serm