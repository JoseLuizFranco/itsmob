import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Car } from '../types/car';
import { fetchCars, addCar, updateCar, deleteCar } from '../services/carService';

interface ApiContextType {
  cars: Car[];
  loading: boolean;
  error: string | null;
  refreshCars: () => Promise<void>;
  addNewCar: (car: Omit<Car, 'id'>) => Promise<boolean>;
  updateExistingCar: (id: number, car: Partial<Car>) => Promise<boolean>;
  removeExistingCar: (id: number) => Promise<boolean>;
}

const ApiContext = createContext<ApiContextType>({
  cars: [],
  loading: false,
  error: null,
  refreshCars: async () => {},
  addNewCar: async () => false,
  updateExistingCar: async () => false,
  removeExistingCar: async () => false
});

export const useApi = () => useContext(ApiContext);

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedCars = await fetchCars();
      setCars(fetchedCars);
    } catch (err) {
      setError('Erro ao carregar os dados dos veículos.');
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCars();
  }, []);

  const addNewCar = async (car: Omit<Car, 'id'>): Promise<boolean> => {
    try {
      const newCar = await addCar(car);
      setCars(prevCars => [...prevCars, newCar]);
      return true;
    } catch (err) {
      setError('Erro ao adicionar o veículo.');
      console.error('Error adding car:', err);
      return false;
    }
  };

  const updateExistingCar = async (id: number, car: Partial<Car>): Promise<boolean> => {
    try {
      const updatedCar = await updateCar(id, car);
      setCars(prevCars => 
        prevCars.map(c => c.id === id ? { ...c, ...updatedCar } : c)
      );
      return true;
    } catch (err) {
      setError('Erro ao atualizar o veículo.');
      console.error('Error updating car:', err);
      return false;
    }
  };

  const removeExistingCar = async (id: number): Promise<boolean> => {
    try {
      await deleteCar(id);
      setCars(prevCars => prevCars.filter(c => c.id !== id));
      return true;
    } catch (err) {
      setError('Erro ao remover o veículo.');
      console.error('Error deleting car:', err);
      return false;
    }
  };

  return (
    <ApiContext.Provider 
      value={{ 
        cars, 
        loading, 
        error, 
        refreshCars, 
        addNewCar, 
        updateExistingCar, 
        removeExistingCar 
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};