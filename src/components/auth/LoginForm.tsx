// src/components/auth/LoginForm.tsx

import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuthStore } from '../../store/authStore';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const { setUserFromSession, setLoading } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error || !data?.user) {
      setErro('E-mail ou senha incorretos.');
      setLoading(false);
      return;
    }

    setUserFromSession(data.user);
    setSucesso('Login realizado com sucesso!');

    setTimeout(() => {
      window.location.href = '/';
    }, 1000);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-gray-800 p-8 rounded-lg shadow-lg w-full"
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Entrar</h1>

      {erro && <p className="text-red-500 mb-4 text-center">{erro}</p>}
      {sucesso && <p className="text-green-500 mb-4 text-center">{sucesso}</p>}

      <input
        type="email"
        placeholder="Seu e-mail"
        className="w-full mb-4 p-3 rounded bg-gray-900 border border-gray-700 text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Senha"
        className="w-full mb-6 p-3 rounded bg-gray-900 border border-gray-700 text-white"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded font-bold"
      >
        Entrar
      </button>

      <p className="text-sm text-center mt-4 text-gray-300">
        Esqueceu a senha?{' '}
        <a href="/recover" className="text-blue-400 hover:underline">
          Recuperar senha
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
