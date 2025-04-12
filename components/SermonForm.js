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
      elevation={1} 
      sx={{ 
        p: 4, 
        mb: 4, 
        borderRadius: 2,
        boxShadow: theme.shadows[1],
        bgcolor: 'background.paper',
      }}
    >
      <Typography variant="h6" fontWeight="600" mb={3} color="text.primary">
        Genera tu Sermón
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ '& > *': { mb: 3 } }}>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Tema del Sermón
          </Typography>
          <TextField
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="Ej: El amor de Dios, La fe, El perdón..."
            fullWidth
            required
            variant="outlined"
            size="medium"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />
        </Box>
        
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Versículo Base (opcional)
          </Typography>
          <TextField
            id="verse"
            name="verse"
            value={formData.verse}
            onChange={handleChange}
            placeholder="Ej: Juan 3:16, Salmos 23, etc."
            fullWidth
            variant="outlined"
            size="medium"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />
        </Box>
        
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Estilo del Mensaje
          </Typography>
          <Select
            id="style"
            name="style"
            value={formData.style}
            onChange={handleChange}
            displayEmpty
            fullWidth
            required
            size="medium"
            sx={{ 
              borderRadius: 1,
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
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Longitud del Sermón
          </Typography>
          <Select
            id="length"
            name="length"
            value={formData.length}
            onChange={handleChange}
            displayEmpty
            fullWidth
            required
            size="medium"
            sx={{ 
              borderRadius: 1,
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
            mt: 1,
            borderRadius: 4, 
            textTransform: 'none',
            fontWeight: 500,
            bgcolor: theme.palette.primary.main,
          }}
        >
          {loadingSermon ? 'Generando...' : 'Generar Sermón'}
        </Button>
      </Box>
    </Paper>
  );
};

export default SermonForm;
