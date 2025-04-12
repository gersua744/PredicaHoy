import React, { createContext, useContext, useState, useEffect } from 'react';
import { getFromStorage, saveToStorage } from '../utils/storage';

// Crear contexto con valores por defecto
const SermonContext = createContext({
  currentSermon: null,
  sermonHistory: [],
  loadingSermon: false,
  generateSermon: () => {},
  restoreSermon: () => {},
  clearHistory: () => {}
});

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

// Hook personalizado para usar el contexto que maneja el SSR
export const useSermonContext = () => {
  // Solo usamos useContext en el cliente
  if (typeof window === 'undefined') {
    // Valores por defecto para SSR
    return {
      currentSermon: null,
      sermonHistory: [],
      loadingSermon: false,
      generateSermon: () => {},
      restoreSermon: () => {},
      clearHistory: () => {}
    };
  }
  
  // En el cliente, usamos normalmente useContext
  return useContext(SermonContext);
};
