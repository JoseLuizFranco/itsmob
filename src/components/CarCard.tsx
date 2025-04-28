import React from 'react';
import { Link } from 'react-router-dom';
import { Car as CarIcon, Settings, Calendar } from 'lucide-react';
import { Car } from '../types/car';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 bg-gray-200">
        {car.imageUrl ? (
          <img 
            src={car.imageUrl} 
            alt={`${car.tipo} ${car.classificacao}`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-100">
            <CarIcon size={64} className="text-blue-900 opacity-50" />
          </div>
        )}
        <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 rounded-bl-lg">
          {car.cambio === 'Automatico' ? 'Automático' : 'Manual'}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-blue-900 mb-1">{car.classificacao}</h3>
        <p className="text-gray-600 mb-3">{car.modelos}</p>
        
        <div className="flex items-center space-x-3 mb-3 text-sm">
          <div className="flex items-center">
            <Settings size={16} className="text-blue-700 mr-1" />
            <span>{car.motorizacao}</span>
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="text-blue-700 mr-1" />
            <span>{car.tipo}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-3 space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-600">Diária:</span>
            <span className="font-semibold">
              {car.curtoPrazo === 'Sob Consulta' ? 'Sob Consulta' : car.curtoPrazo}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Mensal (1000 km):</span>
            <span className="font-semibold">
              {car.mensal1000 === 'Sob Consulta' ? 'Sob Consulta' : car.mensal1000}
            </span>
          </div>
        </div>
        
        <Link 
          to={`/car/${car.id}`}
          className="block w-full bg-blue-900 hover:bg-blue-800 text-white text-center py-2 rounded-md mt-4 transition-colors"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default CarCard;