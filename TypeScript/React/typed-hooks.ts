/**
 * Hooks de React con TypeScript Avanzado
 */
import { useState, useEffect, useCallback, useReducer } from 'react';

// 1. Hook personalizado con tipo genérico
export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function 
        ? value(storedValue) 
        : value;
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          setStoredValue(event.newValue ? JSON.parse(event.newValue) : initialValue);
        } catch (error) {
          console.error(error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);

  return [storedValue, setValue];
}

// 2. Hook para fetch con tipos genéricos
type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

type FetchAction<T> = 
  | { type: 'FETCH_INIT' }
  | { type: 'FETCH_SUCCESS'; payload: T }
  | { type: 'FETCH_FAILURE'; payload: Error };

function fetchReducer<T>(
  state: FetchState<T>, 
  action: FetchAction<T>
): FetchState<T> {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error();
  }
}

export function useFetch<T = unknown>(
  url: string,
  options?: RequestInit
): FetchState<T> {
  const [state, dispatch] = useReducer(fetchReducer<T>, {
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const response = await fetch(url, { ...options, signal });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = (await response.json()) as T;
        dispatch({ type: 'FETCH_SUCCESS', payload: json });
      } catch (error) {
        if (error.name !== 'AbortError') {
          dispatch({ type: 'FETCH_FAILURE', payload: error as Error });
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, options]);

  return state;
}
