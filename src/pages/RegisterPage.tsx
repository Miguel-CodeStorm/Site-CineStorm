// src/pages/RegisterPage.tsx

import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
    });

    if (error) {
      setErro(error.message);
    } else {
      setSucesso('Conta criada com sucesso! Verifique seu e-mail.');
      setTimeout(() => navigate('/login'), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6">Criar Conta</h1>

        {erro && <p className="text-red-500 mb-4">{erro}</p>}
        {sucesso && <p className="text-green-500 mb-4">{sucesso}</p>}

        <input
          type="email"
          placeholder="Seu e-mail"
          className="w-full mb-4 p-3 rounded bg-gray-900 border border-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-6 p-3 rounded bg-gray-900 border border-gray-700"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded font-bold"
        >
          Criar Conta
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
