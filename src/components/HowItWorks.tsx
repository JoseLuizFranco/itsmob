import React from 'react';
import { Search, CalendarCheck, Car, CreditCard } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <Search size={40} className="text-orange-500" />,
      title: 'Escolha seu veículo',
      description: 'Navegue por nossa ampla seleção de veículos e encontre o que melhor atende às suas necessidades.'
    },
    {
      icon: <CalendarCheck size={40} className="text-orange-500" />,
      title: 'Selecione o período',
      description: 'Defina se precisa para curto prazo (diárias) ou médio prazo (mensal) com a quilometragem ideal.'
    },
    {
      icon: <CreditCard size={40} className="text-orange-500" />,
      title: 'Faça a reserva',
      description: 'Complete sua reserva online e receba a confirmação instantaneamente por e-mail.'
    },
    {
      icon: <Car size={40} className="text-orange-500" />,
      title: 'Retire seu veículo',
      description: 'Dirija-se à nossa unidade mais próxima para retirar seu veículo no dia agendado.'
    }
  ];

  return (
    <section id="como-funciona" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-3">Como Funciona</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Alugar um veículo na ItsMob é simples, rápido e sem complicações. Siga estes passos:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg font-medium text-gray-700 mb-4">
            Pronto para alugar um veículo?
          </p>
          <a 
            href="#categorias"
            className="inline-block bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-md transition-colors"
          >
            Ver Catálogo de Veículos
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;