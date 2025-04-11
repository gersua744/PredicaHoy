import React, { createContext, useState, useContext, useEffect } from 'react';

// Contexto para gestionar sermones
const SermonContext = createContext({
  currentSermon: null,
  loadingSermon: false,
  sermonHistory: [],
  generateSermon: () => {},
  restoreSermon: () => {},
  removeFromHistory: () => {},
});

// Hook personalizado para usar el contexto
export const useSermonContext = () => useContext(SermonContext);

// Máximo de sermones en historial
const MAX_HISTORY_SIZE = 10;

// Proveedor del contexto de sermones
export const SermonContextProvider = ({ children }) => {
  // Estado para el sermón actual
  const [currentSermon, setCurrentSermon] = useState(null);
  // Estado para indicar carga de sermón
  const [loadingSermon, setLoadingSermon] = useState(false);
  // Estado para el historial de sermones
  const [sermonHistory, setSermonHistory] = useState([]);
  
  // Carga historial desde localStorage al iniciar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedHistory = localStorage.getItem('sermonHistory');
      if (storedHistory) {
        try {
          setSermonHistory(JSON.parse(storedHistory));
        } catch (error) {
          console.error('Error parsing sermon history:', error);
          localStorage.removeItem('sermonHistory');
        }
      }
    }
  }, []);
  
  // Guarda historial en localStorage cuando cambia
  useEffect(() => {
    if (typeof window !== 'undefined' && sermonHistory.length > 0) {
      localStorage.setItem('sermonHistory', JSON.stringify(sermonHistory));
    }
  }, [sermonHistory]);
  
  // Función para generar un nuevo sermón
  const generateSermon = async (params) => {
    setLoadingSermon(true);
    try {
      // Llamada a la API
      const response = await fetch('/api/generate-sermon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      
      if (!response.ok) {
        throw new Error('Error generating sermon');
      }
      
      const data = await response.json();
      setCurrentSermon(data.sermon);
      
      // Añade al historial, limitando tamaño
      setSermonHistory(prev => {
        // Evita duplicados (mismo tema y versículo)
        const isDuplicate = prev.some(
          sermon => sermon.metadata?.topic === data.sermon.metadata?.topic && 
                   sermon.metadata?.verse === data.sermon.metadata?.verse
        );
        
        if (isDuplicate) return prev;
        
        // Añade al inicio, limita tamaño
        const updated = [data.sermon, ...prev].slice(0, MAX_HISTORY_SIZE);
        return updated;
      });
      
    } catch (error) {
      console.error('Error generating sermon:', error);
      // Aquí podrías manejar errores, mostrar notificaciones, etc.
    } finally {
      setLoadingSermon(false);
    }
  };
  
  // Función para restaurar un sermón del historial
  const restoreSermon = (sermon) => {
    setCurrentSermon(sermon);
  };
  
  // Función para eliminar un sermón del historial
  const removeFromHistory = (index) => {
    setSermonHistory(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      
      // Si se elimina el único sermón, limpia localStorage
      if (updated.length === 0 && typeof window !== 'undefined') {
        localStorage.removeItem('sermonHistory');
      }
      
      return updated;
    });
  };
  
  return (
    <SermonContext.Provider
      value={{
        currentSermon,
        loadingSermon,
        sermonHistory,
        generateSermon,
        restoreSermon,
        removeFromHistory
      }}
    >
      {children}
    </SermonContext.Provider>
  );
};

