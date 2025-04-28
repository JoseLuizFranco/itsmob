import React from 'react';
import { Search } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Alugue o Veículo Ideal para Suas Necessidades
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Encontre as melhores opções para aluguel de curto e médio prazo, com preços competitivos e atendimento de qualidade.
          </p>
          
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Veículo
                </label>
                <select
                  id="tipo"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">Qualquer tipo</option>
                  <option value="hatch">Hatch</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="pickup">Pick Up</option>
                </select>
              </div>
              
              <div className="col-span-1">
                <label htmlFor="periodo" className="block text-sm font-medium text-gray-700 mb-1">
                  Período
                </label>
                <select
                  id="periodo"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value="">Selecione</option>
                  <option value="curto">Curto Prazo (Diária)</option>
                  <option value="mensal-1000">Mensal (1000 km)</option>
                  <option value="mensal-2000">Mensal (2000 km)</option>
                  <option value="mensal-3000">Mensal (3000 km)</option>
                  <option value="mensal-4000">Mensal (4000 km)</option>
                  <option value="mensal-5000">Mensal (5000 km)</option>
                </select>
              </div>
              
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1 opacity-0 md:block hidden">
                  Buscar
                </label>
                <button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center"
                >
                  <Search size={20} className="mr-2" />
                  Buscar Veículos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;