import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFromStorage, saveToStorage } from '../utils/storage';

// Crear contexto
const SermonContext = createContext(null);

// Proveedor del contexto
export const SermonContextProvider = ({ children }) => {
  const [currentSermon, setCurrentSermon] = useState(null);
  const [sermonHistory, setSermonHistory] = useState([]);
  const [loadingSermon, setLoadingSermon] = useState(false);
  
  // Cargar historial de sermones del localStorage al montar
  useEffect(() => {
    const storedHistory = getFromStorage('sermonHistory', []);
    setSermonHistory(storedHistory);
    
    // También podríamos cargar el último sermón
    const lastSermon = getFromStorage('currentSermon', null);
    if (lastSermon) {
      setCurrentSermon(lastSermon);
    }
  }, []);
  
  // Función para generar un nuevo sermón
  const generateSermon = async (params) => {
    setLoadingSermon(true);
    
    try {
      // En una implementación real, aquí llamaríamos a la API
      const response = await fetch('/api/generate-sermon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Error al generar sermón');
      }
      
      // Actualizar el sermón actual
      setCurrentSermon(data.sermon);
      
      // Guardar en localStorage
      saveToStorage('currentSermon', data.sermon);
      
      // Añadir al historial
      const updatedHistory = [data.sermon, ...sermonHistory].slice(0, 10); // Limitar a 10
      setSermonHistory(updatedHistory);
      saveToStorage('sermonHistory', updatedHistory);
      
    } catch (error) {
      console.error('Error al generar sermón:', error);
      alert('Hubo un error al generar el sermón. Por favor, intenta de nuevo.');
    } finally {
      setLoadingSermon(false);
    }
  };
  
  // Función para restaurar un sermón del historial
  const restoreSermon = (sermon) => {
    setCurrentSermon(sermon);
    saveToStorage('currentSermon', sermon);
  };
  
  // Función para limpiar el historial
  const clearHistory = () => {
    setSermonHistory([]);
    saveToStorage('sermonHistory', []);
  };
  
  // Valores a proporcionar a los consumidores
  const contextValue = {
    currentSermon,
    sermonHistory,
    loadingSermon,
    generateSermon,
    restoreSermon,
    clearHistory,
  };
  
  return (
    <SermonContext.Provider value={contextValue}>
      {children}
    </SermonContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useSermonContext = () => {
  const context = useContext(SermonContext);
  if (context === null) {
    throw new Error('useSermonContext debe ser usado dentro de SermonContextProvider');
  }
  return context;
};
