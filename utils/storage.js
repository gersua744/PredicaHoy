// Función para guardar datos en localStorage con manejo de errores
export const saveToStorage = (key, data) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    }
  } catch (error) {
    console.error(`Error saving to localStorage (${key}):`, error);
    return false;
  }
  return false;
};

// Función para obtener datos de localStorage con manejo de errores
export const getFromStorage = (key, defaultValue = null) => {
  try {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      if (item) {
        return JSON.parse(item);
      }
    }
  } catch (error) {
    console.error(`Error getting from localStorage (${key}):`, error);
  }
  return defaultValue;
};

// Función para eliminar datos de localStorage
export const removeFromStorage = (key) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
      return true;
    }
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
    return false;
  }
  return false;
};
