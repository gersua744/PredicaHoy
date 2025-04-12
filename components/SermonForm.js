import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button,
  useTheme
} from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useSermonContext } from '../contexts/SermonContext';

const SermonForm = () => {
  const theme = useTheme();
  const { generateSermon, loadingSermon } = useSermonContext();
  
  const [formData, setFormData] = useState({
    topic: '',
    verse: '',
    style: '',
    length: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    generateSermon(formData);
  };
  
  return (
    <Paper 
      elevation={4} 
      sx={{ 
        p: 6, 
        mb: 8, 
        borderRadius: 2,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        bgcolor: theme.palette.mode === 'light' ? 'white' : 'grey.800',
      }}
    >
      {/* Resto del componente SermonForm */}
      {/* ... */}
    </Paper>
  );
};

export default SermonForm;
