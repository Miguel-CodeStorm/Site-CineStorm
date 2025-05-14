// src/pages/RegisterPage.tsx

import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: { nome },
        },
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          setErro('Este e-mail já está sendo utilizado.');
        } else {
          setErro(error.message);
        }
        return;
      }

      setSucesso('Conta criada com sucesso! Verifique seu e-mail.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setErro('Erro inesperado. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-4">
      <form
        onSubmit={handleRegister}
        className="bg-[#111] p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-800"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Criar Conta</h1>

        {erro && <p className="text-red-500 mb-4 text-center">{erro}</p>}
        {sucesso && <p className="text-green-500 mb-4 text-center">{sucesso}</p>}

        <input
          type="text"
          placeholder="Nome de Usuário"
          className="w-full mb-4 p-3 rounded bg-gray-900 border border-gray-700"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

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
          className="w-full mb-4 p-3 rounded bg-gray-900 border border-gray-700"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirmar Senha"
          className="w-full mb-6 p-3 rounded bg-gray-900 border border-gray-700"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded font-bold"
        >
          Criar Conta
        </button>

        <p className="text-center mt-4 text-gray-400">
          Já tem uma conta? <a href="/login" className="text-blue-500">Entrar</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
