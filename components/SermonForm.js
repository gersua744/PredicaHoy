import React, { useState } from 'react';
import { 
  Paper, 
  Typography, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Box,
  useTheme
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { useSermonContext } from '../contexts/SermonContext';

const SermonForm = () => {
  const theme = useTheme();
  const { generateSermon } = useSermonContext();
  
  const [formData, setFormData] = useState({
    topic: '',
    verse: '',
    style: 'expositivo',
    length: 'medium'
  });
  
  const [formErrors, setFormErrors] = useState({
    topic: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validación
    if (name === 'topic' && !value.trim()) {
      setFormErrors(prev => ({
        ...prev,
        topic: 'El tema es requerido'
      }));
    } else if (name === 'topic') {
      setFormErrors(prev => ({
        ...prev,
        topic: ''
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar antes de enviar
    if (!formData.topic.trim()) {
      setFormErrors(prev => ({
        ...prev,
        topic: 'El tema es requerido'
      }));
      return;
    }
    
    // Enviar datos para generar sermón
    generateSermon(formData);
  };
  
  return (
    <Paper 
      elevation={3} 
      component="form" 
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        mb: 4
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
        Genera tu Sermón
      </Typography>
      
      <TextField
        fullWidth
        label="Tema del Sermón"
        name="topic"
        value={formData.topic}
        onChange={handleChange}
        error={!!formErrors.topic}
        helperText={formErrors.topic || 'Ej: El amor de Dios, La oración, El perdón'}
        margin="normal"
        required
        variant="outlined"
      />
      
      <TextField
        fullWidth
        label="Versículo Base (opcional)"
        name="verse"
        value={formData.verse}
        onChange={handleChange}
        helperText="Ej: Juan 3:16, Salmos 23:1, Romanos 8:28"
        margin="normal"
        variant="outlined"
      />
      
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="style-label">Estilo del Mensaje</InputLabel>
        <Select
          labelId="style-label"
          name="style"
          value={formData.style}
          onChange={handleChange}
          label="Estilo del Mensaje"
        >
          <MenuItem value="expositivo">Expositivo</MenuItem>
          <MenuItem value="tematico">Temático</MenuItem>
          <MenuItem value="evangelistico">Evangelístico</MenuItem>
          <MenuItem value="devocional">Devocional</MenuItem>
        </Select>
      </FormControl>
      
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="length-label">Longitud del Sermón</InputLabel>
        <Select
          labelId="length-label"
          name="length"
          value={formData.length}
          onChange={handleChange}
          label="Longitud del Sermón"
        >
          <MenuItem value="short">Corto (5-10 min)</MenuItem>
          <MenuItem value="medium">Medio (15-20 min)</MenuItem>
          <MenuItem value="long">Largo (25-30 min)</MenuItem>
        </Select>
      </FormControl>
      
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          size="large"
          startIcon={<CreateIcon />}
        >
          Generar Sermón
        </Button>
      </Box>
    </Paper>
  );
};

export default SermonForm;

  
 
