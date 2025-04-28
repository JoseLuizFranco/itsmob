import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit, Trash2, Check, X, AlertTriangle, Search
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useApi } from '../contexts/ApiContext';
import { Car } from '../types/car';

const AdminPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { cars, loading, error, refreshCars, addNewCar, updateExistingCar, removeExistingCar } = useApi();
  
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCar, setNewCar] = useState<Omit<Car, 'id'>>({
    tipo: '',
    classificacao: '',
    cambio: '',
    motorizacao: '',
    modelos: '',
    curtoPrazo: '',
    mensal1000: '',
    mensal2000: '',
    mensal3000: '',
    mensal4000: '',
    mensal5000: '',
    imageUrl: ''
  });
  const [editCar, setEditCar] = useState<Car | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await addNewCar(newCar);
    if (success) {
      setIsAdding(false);
      setNewCar({
        tipo: '',
        classificacao: '',
        cambio: '',
        motorizacao: '',
        modelos: '',
        curtoPrazo: '',
        mensal1000: '',
        mensal2000: '',
        mensal3000: '',
        mensal4000: '',
        mensal5000: '',
        imageUrl: ''
      });
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing !== null && editCar !== null) {
      const success = await updateExistingCar(isEditing, editCar);
      if (success) {
        setIsEditing(null);
        setEditCar(null);
      }
    }
  };

  const startEdit = (car: Car) => {
    setIsEditing(car.id);
    setEditCar({ ...car });
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setEditCar(null);
  };

  const confirmDelete = async (id: number) => {
    const success = await removeExistingCar(id);
    if (success) {
      setDeleteConfirm(null);
    }
  };

  const filteredCars = cars.filter(car => {
    const searchLower = searchTerm.toLowerCase();
    return (
      car.tipo.toLowerCase().includes(searchLower) ||
      car.classificacao.toLowerCase().includes(searchLower) ||
      car.modelos.toLowerCase().includes(searchLower)
    );
  });

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Painel Administrativo</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-blue-900">Gerenciar Veículos</h2>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
          >
            {isAdding ? (
              <>
                <X size={18} className="mr-1" />
                Cancelar
              </>
            ) : (
              <>
                <Plus size={18} className="mr-1" />
                Adicionar Veículo
              </>
            )}
          </button>
        </div>
        
        {isAdding && (
          <form onSubmit={handleAddSubmit} className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="text-lg font-medium text-blue-900 mb-4">Adicionar Novo Veículo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select
                  value={newCar.tipo}
                  onChange={(e) => setNewCar({ ...newCar, tipo: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Hatch">Hatch</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Suv">SUV</option>
                  <option value="Pick Up">Pick Up</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Classificação</label>
                <input
                  type="text"
                  value={newCar.classificacao}
                  onChange={(e) => setNewCar({ ...newCar, classificacao: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Câmbio</label>
                <select
                  value={newCar.cambio}
                  onChange={(e) => setNewCar({ ...newCar, cambio: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatico">Automático</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Motorização</label>
                <select
                  value={newCar.motorizacao}
                  onChange={(e) => setNewCar({ ...newCar, motorizacao: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="1.0">1.0</option>
                  <option value="1.0 >">Acima de 1.0</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modelos</label>
                <input
                  type="text"
                  value={newCar.modelos}
                  onChange={(e) => setNewCar({ ...newCar, modelos: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                <input
                  type="text"
                  value={newCar.imageUrl}
                  onChange={(e) => setNewCar({ ...newCar, imageUrl: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <h4 className="text-md font-medium text-blue-900 mb-2">Preços</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Curto Prazo</label>
                <input
                  type="text"
                  value={newCar.curtoPrazo}
                  onChange={(e) => setNewCar({ ...newCar, curtoPrazo: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="BRL 000,00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensal (1000 km)</label>
                <input
                  type="text"
                  value={newCar.mensal1000}
                  onChange={(e) => setNewCar({ ...newCar, mensal1000: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="BRL 0.000,00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensal (2000 km)</label>
                <input
                  type="text"
                  value={newCar.mensal2000}
                  onChange={(e) => setNewCar({ ...newCar, mensal2000: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="BRL 0.000,00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensal (3000 km)</label>
                <input
                  type="text"
                  value={newCar.mensal3000}
                  onChange={(e) => setNewCar({ ...newCar, mensal3000: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="BRL 0.000,00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensal (4000 km)</label>
                <input
                  type="text"
                  value={newCar.mensal4000}
                  onChange={(e) => setNewCar({ ...newCar, mensal4000: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="BRL 0.000,00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mensal (5000 km)</label>
                <input
                  type="text"
                  value={newCar.mensal5000}
                  onChange={(e) => setNewCar({ ...newCar, mensal5000: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="BRL 0.000,00"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Adicionar Veículo
              </button>
            </div>
          </form>
        )}
        
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar veículos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full md:w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
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
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classificação
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modelos
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Curto Prazo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mensal (1000 km)
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCars.length > 0 ? (
                  filteredCars.map((car) => (
                    <tr key={car.id}>
                      {isEditing === car.id && editCar ? (
                        <>
                          <td colSpan={6} className="px-6 py-4">
                            <form onSubmit={handleEditSubmit} className="bg-blue-50 p-4 rounded-md">
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                  <select
                                    value={editCar.tipo}
                                    onChange={(e) => setEditCar({ ...editCar, tipo: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                  >
                                    <option value="Hatch">Hatch</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="Suv">SUV</option>
                                    <option value="Pick Up">Pick Up</option>
                                  </select>
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Classificação</label>
                                  <input
                                    type="text"
                                    value={editCar.classificacao}
                                    onChange={(e) => setEditCar({ ...editCar, classificacao: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Câmbio</label>
                                  <select
                                    value={editCar.cambio}
                                    onChange={(e) => setEditCar({ ...editCar, cambio: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                  >
                                    <option value="Manual">Manual</option>
                                    <option value="Automatico">Automático</option>
                                  </select>
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Motorização</label>
                                  <select
                                    value={editCar.motorizacao}
                                    onChange={(e) => setEditCar({ ...editCar, motorizacao: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                  >
                                    <option value="1.0">1.0</option>
                                    <option value="1.0 >">Acima de 1.0</option>
                                  </select>
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Modelos</label>
                                  <input
                                    type="text"
                                    value={editCar.modelos}
                                    onChange={(e) => setEditCar({ ...editCar, modelos: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                                  <input
                                    type="text"
                                    value={editCar.imageUrl}
                                    onChange={(e) => setEditCar({ ...editCar, imageUrl: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                </div>
                              </div>
                              
                              <h4 className="text-md font-medium text-blue-900 mb-2">Preços</h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Curto Prazo</label>
                                  <input
                                    type="text"
                                    value={editCar.curtoPrazo}
                                    onChange={(e) => setEditCar({ ...editCar, curtoPrazo: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensal (1000 km)</label>
                                  <input
                                    type="text"
                                    value={editCar.mensal1000}
                                    onChange={(e) => setEditCar({ ...editCar, mensal1000: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensal (2000 km)</label>
                                  <input
                                    type="text"
                                    value={editCar.mensal2000}
                                    onChange={(e) => setEditCar({ ...editCar, mensal2000: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensal (3000 km)</label>
                                  <input
                                    type="text"
                                    value={editCar.mensal3000}
                                    onChange={(e) => setEditCar({ ...editCar, mensal3000: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensal (4000 km)</label>
                                  <input
                                    type="text"
                                    value={editCar.mensal4000}
                                    onChange={(e) => setEditCar({ ...editCar, mensal4000: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensal (5000 km)</label>
                                  <input
                                    type="text"
                                    value={editCar.mensal5000}
                                    onChange={(e) => setEditCar({ ...editCar, mensal5000: e.target.value })}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                  />
                                </div>
                              </div>
                              
                              <div className="flex justify-end">
                                <button
                                  type="button"
                                  onClick={cancelEdit}
                                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2 transition-colors"
                                >
                                  Cancelar
                                </button>
                                <button
                                  type="submit"
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                  Salvar Alterações
                                </button>
                              </div>
                            </form>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {car.tipo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {car.classificacao}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {car.modelos}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {car.curtoPrazo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {car.mensal1000}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {deleteConfirm === car.id ? (
                              <div className="flex items-center space-x-2">
                                <span className="text-red-600 flex items-center">
                                  <AlertTriangle size={16} className="mr-1" />
                                  Confirmar?
                                </span>
                                <button
                                  onClick={() => confirmDelete(car.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <Check size={18} />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(null)}
                                  className="text-gray-600 hover:text-gray-900"
                                >
                                  <X size={18} />
                                </button>
                              </div>
                            ) : (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => startEdit(car)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirm(car.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      Nenhum veículo encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;