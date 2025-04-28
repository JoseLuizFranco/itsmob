import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <Car size={28} className="text-orange-500" />
            <span>ItsMob</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-orange-300 transition-colors">
              Início
            </Link>
            <Link to="/#categorias" className="hover:text-orange-300 transition-colors">
              Categorias
            </Link>
            <Link to="/#como-funciona" className="hover:text-orange-300 transition-colors">
              Como Funciona
            </Link>
            <Link to="/#contato" className="hover:text-orange-300 transition-colors">
              Contato
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/admin" 
                  className="hover:text-orange-300 transition-colors flex items-center"
                >
                  <User size={20} className="mr-1" />
                  Admin
                </Link>
                <button 
                  onClick={logout} 
                  className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md transition-colors"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md transition-colors"
              >
                Área Admin
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-3 border-t border-blue-800 mt-3">
            <Link 
              to="/" 
              className="block hover:text-orange-300 transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/#categorias" 
              className="block hover:text-orange-300 transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Categorias
            </Link>
            <Link 
              to="/#como-funciona" 
              className="block hover:text-orange-300 transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link 
              to="/#contato" 
              className="block hover:text-orange-300 transition-colors py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            {isAuthenticated ? (
              <div className="space-y-2 pt-1">
                <Link 
                  to="/admin" 
                  className="block hover:text-orange-300 transition-colors py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }} 
                  className="w-full text-left bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md transition-colors"
                >
                  Sair
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="block bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Área Admin
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;