import React, { useState } from 'react';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const response = await api.post('/register', {
        email: email,
        password: password,
      });

      setEmail('');
      setPassword('');
      toast.success(response.data.message || 'Usuário registrado com sucesso');
      navigate("/login")
    } catch (error) {

      console.log(error)
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
      if (error.response.data.errors.password) {
        toast.error(error.response.data.errors.password.message);
      } else {
        toast.error('Ocorreu um erro desconhecido, tente novamente');
      }
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-orange-500"></div>

      <div className="flex-1 flex flex-col items-center justify-center bg-white relative">
        <div className="w-full max-w-lg px-1 space-y-2 text-center mt-[-4rem]">
          <h2 className="text-3xl font-bold text-gray-900">Registre-se</h2>
          <p className="text-sm text-gray-600 mt-1">Crie sua conta</p>
          <form onSubmit={handleRegister} className="space-y-6 mt-4 text-left">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 mt-1 border-none rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 mt-1 border-none border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-4 py-3 text-sm font-medium text-white ${
                  loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
                } border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
              >
                {loading ? 'Carregando...' : 'Criar conta'}
              </button>
            </div>
          </form>
          <div className="text-sm text-center"></div>
        </div>
        <footer className="absolute bottom-4 text-center text-sm font-bold text-gray-800">
          Desenvolvido por Arthur Amaral, Codetech
        </footer>
      </div>
    </div>
  );
}

export default Register;
