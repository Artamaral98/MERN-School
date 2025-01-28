import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const NotFound = () => {

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">404 - Página não encontrada</h1>
      <p className="mt-4 text-gray-700">Desculpe, não conseguimos encontrar a página que você estava procurando</p>
      <Link to="/home" className="mt-6 text-orange-500 hover:text-orange-700">
        Voltar para a página principal.
      </Link>
    </div>
  );
};

export default NotFound;
