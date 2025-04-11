import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { useSermonContext } from '../contexts/SermonContext';

const SermonForm = () => {
  const { generateSermon } = useSermonContext();
  
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
        p: 3, 
        mb: 4,
        borderRadius: 2
      }}
    >
      <Typography variant="h6" fontWeight="600" mb={3}>
        Genera tu Sermón
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ '& > *': { mb: 3 } }}>
        <Box>
          <InputLabel sx={{ mb: 1, fontSize: 14, fontWeight: 500 }}>
            Tema del Sermón
          </InputLabel>
          <TextField
            fullWidth
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="Ej: El amor de Dios, La fe, El perdón..."
            required
            variant="outlined"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
                }
              }
            }}
          />
        </Box>
        
        <Box>
          <InputLabel sx={{ mb: 1, fontSize: 14, fontWeight: 500 }}>
            Versículo Base (opcional)
          </InputLabel>
          <TextField
            fullWidth
            name="verse"
            value={formData.verse}
            onChange={handleChange}
            placeholder="Ej: Juan 3:16, Salmos 23, etc."
            variant="outlined"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
                }
              }
            }}
          />
        </Box>
        
        <Box>
          <InputLabel sx={{ mb: 1, fontSize: 14, fontWeight: 500 }}>
            Estilo del Mensaje
          </InputLabel>
          <FormControl fullWidth required>
            <Select
              name="style"
              value={formData.style}
              onChange={handleChange}
              displayEmpty
              sx={{ 
                borderRadius: 1,
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
                }
              }}
            >
              <MenuItem value="" disabled>Selecciona un estilo</MenuItem>
              <MenuItem value="expositivo">Expositivo</MenuItem>
              <MenuItem value="tematico">Temático</MenuItem>
              <MenuItem value="evangelistico">Evangelístico</MenuItem>
              <MenuItem value="devocional">Devocional</MenuItem>
              <MenuItem value="narrativo">Narrativo</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Box>
          <InputLabel sx={{ mb: 1, fontSize: 14, fontWeight: 500 }}>
            Longitud del Sermón
          </InputLabel>
          <FormControl fullWidth required>
            <Select
              name="length"
              value={formData.length}
              onChange={handleChange}
              displayEmpty
              sx={{ 
                borderRadius: 1,
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.3)',
                }
              }}
            >
              <MenuItem value="" disabled>Selecciona una longitud</MenuItem>
              <MenuItem value="corto">Corto (5-10 minutos)</MenuItem>
              <MenuItem value="medio">Medio (15-20 minutos)</MenuItem>
              <MenuItem value="largo">Largo (30+ minutos)</MenuItem>
            </Select>
          </FormControl>
        </Box>
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          startIcon={<FlashOnIcon />}
          sx={{ 
            py: 1.5, 
            borderRadius: 1, 
            textTransform: 'none',
            fontWeight: 500,
            fontSize: 16
          }}
        >
          Generar Sermón
        </Button>
      </Box>
    </Paper>
  );
};

export default SermonForm;

  
 
