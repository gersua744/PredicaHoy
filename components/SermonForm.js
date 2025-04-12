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
      <Typography variant="h6" fontWeight="600" mb={4}>
        Genera tu Sermón
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ '& > *': { mb: 4 } }}>
        <Box>
          <InputLabel htmlFor="topic" sx={{ mb: 1, fontSize: 14, fontWeight: 500 }}>
            Tema del Sermón
          </InputLabel>
          <TextField
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="Ej: El amor de Dios, La fe, El perdón..."
            fullWidth
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
          <InputLabel htmlFor="verse" sx={{ mb: 1, fontSize: 14, fontWeight: 500 }}>
            Versículo Base (opcional)
          </InputLabel>
          <TextField
            id="verse"
            name="verse"
            value={formData.verse}
            onChange={handleChange}
            placeholder="Ej: Juan 3:16, Salmos 23, etc."
            fullWidth
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
          <InputLabel htmlFor="style" sx={{ mb: 1, fontSize: 14, fontWeight: 500 }}>
            Estilo del Mensaje
          </InputLabel>
          <Select
            id="style"
            name="style"
            value={formData.style}
            onChange={handleChange}
            displayEmpty
            fullWidth
            required
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
        </Box>
        
        <Box>
          <InputLabel htmlFor="length" sx={{ mb: 1, fontSize: 14, fontWeight: 500 }}>
            Longitud del Sermón
          </InputLabel>
          <Select
            id="length"
            name="length"
            value={formData.length}
            onChange={handleChange}
            displayEmpty
            fullWidth
            required
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
        </Box>
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          startIcon={<FlashOnIcon />}
          disabled={loadingSermon}
          sx={{ 
            py: 1.5, 
            borderRadius: 1, 
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          {loadingSermon ? 'Generando...' : 'Generar Sermón'}
        </Button>
      </Box>
    </Paper>
  );
};

export default SermonForm;
