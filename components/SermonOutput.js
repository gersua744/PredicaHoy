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
  
  // Resto del componente SermonOutput
  // ...
};

export default SermonOutput;
