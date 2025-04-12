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
  
  // Resto del componente History
  // ...
};

export default History;
