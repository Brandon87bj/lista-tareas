import { useEffect, useState } from 'react';

// Funciona igual que useState, pero guarda el valor en localStorage.
// Así las tareas siguen ahí al cerrar la app y se pueden consultar sin conexión.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? (JSON.parse(saved) as T) : initialValue;
    } catch {
      // Si el dato guardado está dañado, se empieza con el valor inicial
      return initialValue;
    }
  });

  // Cada vez que el valor cambia, se vuelve a guardar
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Si no hay espacio o el navegador lo bloquea, la app sigue funcionando sin guardar
    }
  }, [key, value]);

  return [value, setValue] as const;
}
