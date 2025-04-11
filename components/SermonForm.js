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
  Grid,
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
        mb: 4,
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom align="center">
        Genera tu sermón
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Tema del sermón"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            error={!!formErrors.topic}
            helperText={formErrors.topic || 'Ej: El amor de Dios, La oración, El perdón'}
            margin="normal"
            required
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Versículo base (opcional)"
            name="verse"
            value={formData.verse}
            onChange={handleChange}
            helperText="Ej: Juan 3:16, Salmos 23:1, Romanos 8:28"
            margin="normal"
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="style-label">Estilo del mensaje</InputLabel>
            <Select
              labelId="style-label"
              name="style"
              value={formData.style}
              onChange={handleChange}
              label="Estilo del mensaje"
            >
              <MenuItem value="expositivo">Expositivo</MenuItem>
              <MenuItem value="tematico">Temático</MenuItem>
              <MenuItem value="evangelistico">Evangelístico</MenuItem>
              <MenuItem value="devocional">Devocional</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="length-label">Longitud del sermón</InputLabel>
            <Select
              labelId="length-label"
              name="length"
              value={formData.length}
              onChange={handleChange}
              label="Longitud del sermón"
            >
              <MenuItem value="short">Corto (5-10 min)</MenuItem>
              <MenuItem value="medium">Medio (15-20 min)</MenuItem>
              <MenuItem value="long">Largo (25-30 min)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      
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
