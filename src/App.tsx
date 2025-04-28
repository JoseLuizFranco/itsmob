import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import CarDetailPage from './pages/CarDetailPage';
import { AuthProvider } from './contexts/AuthContext';
import { ApiProvider } from './contexts/ApiContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ApiProvider>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/car/:id" element={<CarDetailPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ApiProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;