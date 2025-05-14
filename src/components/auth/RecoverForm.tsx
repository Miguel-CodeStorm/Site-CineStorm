import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { resetPassword } from '../../utils/supabase';
import Input from '../ui/Input';
import Button from '../ui/Button';

const RecoverForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string }>({});
  
  const validateForm = () => {
    const newErrors: { email?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido';
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
      const { error } = await resetPassword(email);
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Se o email existir, você receberá instruções para redefinir sua senha.');
        setEmail('');
      }
    } catch (err) {
      setError('Ocorreu um erro ao processar sua solicitação. Tente novamente.');
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
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Recuperar Senha</h2>
      
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
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu-email@exemplo.com"
          error={errors.email}
        />
        
        <Button
          type="submit"
          fullWidth
          isLoading={loading}
          className="mt-4"
        >
          Enviar Email de Recuperação
        </Button>
        
        <div className="mt-6 text-center text-gray-400">
          Lembrou sua senha?{' '}
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            Voltar para o login
          </Link>
        </div>
      </form>
    </motion.div>
  );
};

export default RecoverForm;