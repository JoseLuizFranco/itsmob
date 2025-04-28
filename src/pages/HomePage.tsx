import React, { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import CarCard from '../components/CarCard';
import CarFilter from '../components/CarFilter';
import HowItWorks from '../components/HowItWorks';
import { useApi } from '../contexts/ApiContext';
import { Car } from '../types/car';

const HomePage: React.FC = () => {
  const { cars, loading, error } = useApi();
  const [filters, setFilters] = useState({
    tipo: '',
    classificacao: '',
    cambio: '',
    motorizacao: ''
  });

  // Extract unique options for filters
  const tipoOptions = useMemo(() => {
    return [...new Set(cars.map(car => car.tipo))];
  }, [cars]);

  const classificacaoOptions = useMemo(() => {
    return [...new Set(cars.map(car => car.classificacao))];
  }, [cars]);

  // Apply filters to the car list
  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      if (filters.tipo && car.tipo !== filters.tipo) return false;
      if (filters.classificacao && car.classificacao !== filters.classificacao) return false;
      if (filters.cambio && car.cambio !== filters.cambio) return false;
      if (filters.motorizacao && car.motorizacao !== filters.motorizacao) return false;
      return true;
    });
  }, [cars, filters]);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div>
      <Hero />
      
      <HowItWorks />
      
      <section id="categorias" className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Nosso Catálogo de Veículos
          </h2>
          
          <CarFilter 
            onFilterChange={handleFilterChange}
            tipoOptions={tipoOptions}
            classificacaoOptions={classificacaoOptions}
          />
          
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Erro! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          ) : (
            <>
              {filteredCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredCars.map(car => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">
                    Nenhum veículo encontrado com os filtros selecionados.
                  </p>
                  <button
                    onClick={() => setFilters({ tipo: '', classificacao: '', cambio: '', motorizacao: '' })}
                    className="mt-4 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    Limpar Filtros
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;