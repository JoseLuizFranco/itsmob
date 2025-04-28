import React, { useState } from 'react';
import { Filter } from 'lucide-react';

interface CarFilterProps {
  onFilterChange: (filters: { 
    tipo?: string; 
    classificacao?: string; 
    cambio?: string; 
    motorizacao?: string; 
  }) => void;
  tipoOptions: string[];
  classificacaoOptions: string[];
}

const CarFilter: React.FC<CarFilterProps> = ({ 
  onFilterChange,
  tipoOptions,
  classificacaoOptions
}) => {
  const [filters, setFilters] = useState({
    tipo: '',
    classificacao: '',
    cambio: '',
    motorizacao: ''
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      tipo: '',
      classificacao: '',
      cambio: '',
      motorizacao: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-blue-900 flex items-center">
          <Filter size={20} className="mr-2" />
          Filtrar Veículos
        </h2>
        
        <button 
          className="text-blue-900 hover:text-blue-700 md:hidden"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          {isFilterOpen ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>
      
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${isFilterOpen ? 'block' : 'hidden md:grid'}`}>
        <div>
          <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <select
            id="tipo"
            name="tipo"
            value={filters.tipo}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            {tipoOptions.map(tipo => (
              <option key={tipo} value={tipo}>{tipo}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="classificacao" className="block text-sm font-medium text-gray-700 mb-1">
            Classificação
          </label>
          <select
            id="classificacao"
            name="classificacao"
            value={filters.classificacao}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas</option>
            {classificacaoOptions.map(classificacao => (
              <option key={classificacao} value={classificacao}>{classificacao}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="cambio" className="block text-sm font-medium text-gray-700 mb-1">
            Câmbio
          </label>
          <select
            id="cambio"
            name="cambio"
            value={filters.cambio}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos</option>
            <option value="Manual">Manual</option>
            <option value="Automatico">Automático</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="motorizacao" className="block text-sm font-medium text-gray-700 mb-1">
            Motorização
          </label>
          <select
            id="motorizacao"
            name="motorizacao"
            value={filters.motorizacao}
            onChange={handleFilterChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todas</option>
            <option value="1.0">1.0</option>
            <option value="1.0 >">Acima de 1.0</option>
          </select>
        </div>
      </div>
      
      <div className={`mt-4 flex justify-end ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
        <button
          onClick={handleReset}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition-colors"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  );
};

export default CarFilter;