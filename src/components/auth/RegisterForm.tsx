import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signUp } from '../../utils/supabase';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!username) {
      newErrors.username = 'Nome de usuário é obrigatório';
    } else if (username.length < 3) {
      newErrors.username = 'Nome de usuário deve ter pelo menos 3 caracteres';
    }
    
    if (!email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await signUp(email, password, username);
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Conta criada com sucesso! Redirecionando...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError('Ocorreu um erro ao criar a conta. Tente novamente.');
      console.error('Erro ao criar conta:', err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/70 backdrop-blur-lg p-8 rounded-lg shadow-xl max-w-md w-full"
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Criar Conta</h2>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-md p-3 mb-4 text-red-200">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-500/20 border border-green-500 rounded-md p-3 mb-4 text-green-200">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome de Usuário"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Seu nome de usuário"
          error={errors.username}
        />
        
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu-email@exemplo.com"
          error={errors.email}
        />
        
        <Input
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          error={errors.password}
        />
        
        <Input
          label="Confirmar Senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="********"
          error={errors.confirmPassword}
        />
        
        <Button
          type="submit"
          fullWidth
          isLoading={loading}
          className="mt-2"
        >
          Criar Conta
        </Button>
        
        <div className="mt-6 text-center text-gray-400">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Entrar
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default RegisterForm;