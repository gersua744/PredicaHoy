import React, { createContext, useState, useContext, useEffect } from 'react';

// Contexto para sermones
const SermonContext = createContext({
  currentSermon: null,
  loadingSermon: false,
  sermonHistory: [],
  generateSermon: () => {},
  restoreSermon: () => {},
  clearHistory: () => {},
});

// Hook personalizado
export const useSermonContext = () => useContext(SermonContext);

// Proveedor del contexto
export const SermonContextProvider = ({ children }) => {
  const [currentSermon, setCurrentSermon] = useState(null);
  const [loadingSermon, setLoadingSermon] = useState(false);
  const [sermonHistory, setSermonHistory] = useState([]);
  
  // Cargar historial desde localStorage al inicio
  useEffect(() => {
    const savedHistory = localStorage.getItem('sermonHistory');
    if (savedHistory) {
      try {
        setSermonHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Error parsing sermon history:', error);
      }
    }
  }, []);
  
  // Función para generar un sermón
  const generateSermon = async (params) => {
    setLoadingSermon(true);
    
    // Simular tiempo de carga
    setTimeout(() => {
      // Generar sermón (simulado)
      const sermon = {
        title: `${params.topic}: Un mensaje de esperanza`,
        verse: params.verse,
        style: params.style,
        length: params.length,
        introduction: `Reflexionar sobre ${params.topic} es fundamental para nuestra fe cristiana...`,
        points: [
          { 
            title: `El origen bíblico de ${params.topic}`, 
            content: `Las escrituras nos enseñan sobre ${params.topic} desde el principio...` 
          },
          { 
            title: `${params.topic} en la vida de Jesús`, 
            content: `Cristo nos mostró ${params.topic} a través de su ejemplo...` 
          },
          { 
            title: `Aplicando ${params.topic} hoy`, 
            content: `En nuestro mundo actual, ${params.topic} sigue siendo relevante...` 
          }
        ],
        conclusion: `Al reflexionar sobre ${params.topic}, somos desafiados a examinar nuestras propias vidas...`,
        application: [
          `Dedica tiempo diario a estudiar sobre ${params.topic} en la Biblia`,
          `Identifica áreas donde puedes aplicar ${params.topic} esta semana`,
          `Comparte con otros lo que has aprendido sobre ${params.topic}`
        ],
        timestamp: Date.now()
      };
      
      // Actualizar estado
      setCurrentSermon(sermon);
      setLoadingSermon(false);
      
      // Añadir al historial
      const updatedHistory = [sermon, ...sermonHistory].slice(0, 10);
      setSermonHistory(updatedHistory);
      localStorage.setItem('sermonHistory', JSON.stringify(updatedHistory));
    }, 2000);
  };
  
  // Función para restaurar un sermón del historial
  const restoreSermon = (sermon) => {
    setCurrentSermon(sermon);
  };
  
  // Función para limpiar el historial
  const clearHistory = () => {
    if (window.confirm('¿Estás seguro de que deseas borrar todo el historial de sermones?')) {
      setSermonHistory([]);
      localStorage.removeItem('sermonHistory');
    }
  };
  
  return (
    <SermonContext.Provider value={{
      currentSermon,
      loadingSermon,
      sermonHistory,
      generateSermon,
      restoreSermon,
      clearHistory
    }}>
      {children}
    </SermonContext.Provider>
  );
};

