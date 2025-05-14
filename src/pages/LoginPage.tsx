// src/pages/LoginPage.tsx

import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro('E-mail ou senha incorretos.');
      return;
    }

    if (data?.session) {
      localStorage.setItem('sb-session', JSON.stringify(data.session));
      setSucesso('Login realizado com sucesso!');
      setTimeout(() => navigate('/dashboard'), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: 'url(https://images.pexels.com/photos/7991158/pexels-photo-7991158.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080)' }}>
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Entrar</h1>

        {erro && <p className="text-red-400 mb-4 text-center">{erro}</p>}
        {sucesso && <p className="text-green-400 mb-4 text-center">{sucesso}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Seu e-mail"
            className="w-full mb-4 p-3 rounded bg-gray-800 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full mb-6 p-3 rounded bg-gray-800 text-white"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-400">
          Esqueceu a senha?{' '}
          <a href="/recover" className="text-blue-400 hover:underline">
            Recuperar senha
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
