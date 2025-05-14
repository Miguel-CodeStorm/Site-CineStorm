import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import Input from '../ui/Input';
import Button from '../ui/Button';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const { login, loading, error, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Redireciona se login foi bem-sucedido
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      await login(email, password);
      // o redirecionamento agora acontece via useEffect
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800/70 backdrop-blur-lg p-8 rounded-lg shadow-xl max-w-md w-full"
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Entrar</h2>

      {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-md p-3 mb-4 text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
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

        <div className="mb-6 text-right">
          <Link to="/recover" className="text-blue-400 hover:text-blue-300 text-sm">
            Esqueceu sua senha?
          </Link>
        </div>

        <Button
          type="submit"
          fullWidth
          isLoading={loading}
        >
          Entrar
        </Button>

        <div className="mt-6 text-center text-gray-400">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-blue-400 hover:text-blue-300">
            Cadastre-se
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default LoginForm;
