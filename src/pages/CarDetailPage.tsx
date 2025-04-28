import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Car as CarIcon, Settings, Fuel, Calendar, RotateCcw, Users, DollarSign
} from 'lucide-react';
import { useApi } from '../contexts/ApiContext';

const CarDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cars, loading, error } = useApi();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('curto');
  
  const car = cars.find(c => c.id === Number(id));
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-[60vh] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erro! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }
  
  if (!car) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Atenção! </strong>
          <span className="block sm:inline">Veículo não encontrado.</span>
        </div>
        <div className="mt-4">
          <Link to="/" className="text-blue-900 hover:text-blue-700 flex items-center">
            <ArrowLeft size={18} className="mr-1" />
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }
  
  const getPrice = () => {
    switch (selectedPeriod) {
      case 'curto':
        return car.curtoPrazo;
      case 'mensal-1000':
        return car.mensal1000;
      case 'mensal-2000':
        return car.mensal2000;
      case 'mensal-3000':
        return car.mensal3000;
      case 'mensal-4000':
        return car.mensal4000;
      case 'mensal-5000':
        return car.mensal5000;
      default:
        return car.curtoPrazo;
    }
  };
  
  const getPeriodText = () => {
    switch (selectedPeriod) {
      case 'curto':
        return 'Curto Prazo (Diária)';
      case 'mensal-1000':
        return 'Mensal (1000 km)';
      case 'mensal-2000':
        return 'Mensal (2000 km)';
      case 'mensal-3000':
        return 'Mensal (3000 km)';
      case 'mensal-4000':
        return 'Mensal (4000 km)';
      case 'mensal-5000':
        return 'Mensal (5000 km)';
      default:
        return 'Curto Prazo (Diária)';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="text-blue-900 hover:text-blue-700 flex items-center mb-6">
        <ArrowLeft size={18} className="mr-1" />
        Voltar para a página inicial
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <div className="relative h-64 md:h-full bg-gray-200">
              {car.imageUrl ? (
                <img 
                  src={car.imageUrl} 
                  alt={`${car.tipo} ${car.classificacao}`} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-100">
                  <CarIcon size={96} className="text-blue-900 opacity-50" />
                </div>
              )}
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 rounded-bl-lg">
                {car.cambio === 'Automatico' ? 'Automático' : 'Manual'}
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 p-6">
            <h1 className="text-2xl font-bold text-blue-900 mb-2">{car.classificacao}</h1>
            <p className="text-lg text-gray-600 mb-4">{car.modelos}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Settings size={20} className="text-blue-700 mr-2" />
                <span>
                  <span className="text-gray-600">Motorização:</span> {car.motorizacao}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar size={20} className="text-blue-700 mr-2" />
                <span>
                  <span className="text-gray-600">Tipo:</span> {car.tipo}
                </span>
              </div>
              <div className="flex items-center">
                <Fuel size={20} className="text-blue-700 mr-2" />
                <span>
                  <span className="text-gray-600">Combustível:</span> Flex
                </span>
              </div>
              <div className="flex items-center">
                <RotateCcw size={20} className="text-blue-700 mr-2" />
                <span>
                  <span className="text-gray-600">Câmbio:</span> {car.cambio === 'Automatico' ? 'Automático' : 'Manual'}
                </span>
              </div>
              <div className="flex items-center">
                <Users size={20} className="text-blue-700 mr-2" />
                <span>
                  <span className="text-gray-600">Capacidade:</span> 5 pessoas
                </span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mb-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-3">Selecione o Período</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => setSelectedPeriod('curto')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedPeriod === 'curto' 
                      ? 'bg-blue-900 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Curto Prazo (Diária)
                </button>
                <button
                  onClick={() => setSelectedPeriod('mensal-1000')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedPeriod === 'mensal-1000' 
                      ? 'bg-blue-900 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Mensal (1000 km)
                </button>
                <button
                  onClick={() => setSelectedPeriod('mensal-2000')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedPeriod === 'mensal-2000' 
                      ? 'bg-blue-900 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Mensal (2000 km)
                </button>
                <button
                  onClick={() => setSelectedPeriod('mensal-3000')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedPeriod === 'mensal-3000' 
                      ? 'bg-blue-900 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Mensal (3000 km)
                </button>
                <button
                  onClick={() => setSelectedPeriod('mensal-4000')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedPeriod === 'mensal-4000' 
                      ? 'bg-blue-900 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Mensal (4000 km)
                </button>
                <button
                  onClick={() => setSelectedPeriod('mensal-5000')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    selectedPeriod === 'mensal-5000' 
                      ? 'bg-blue-900 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Mensal (5000 km)
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Período Selecionado:</span>
                <span className="font-medium">{getPeriodText()}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Preço:</span>
                <span className="text-xl font-bold text-blue-900">{getPrice()}</span>
              </div>
              <div className="text-sm text-gray-500 mb-4">
                * Os preços são aproximados e podem variar de acordo com a disponibilidade.
              </div>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-md transition-colors flex items-center justify-center">
                <DollarSign size={20} className="mr-2" />
                Solicitar Reserva
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Informações Adicionais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">O que está incluso?</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Proteção básica contra danos e roubo</li>
                <li>Manutenção preventiva</li>
                <li>Assistência 24 horas</li>
                <li>Quilometragem conforme o plano escolhido</li>
                <li>Documentação e licenciamento</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Requisitos para locação</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Carteira de Habilitação válida há mais de 2 anos</li>
                <li>Idade mínima de 21 anos</li>
                <li>Cartão de crédito em nome do condutor</li>
                <li>Comprovante de residência</li>
                <li>RG ou Passaporte</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;