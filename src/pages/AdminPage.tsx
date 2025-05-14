import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { useAuthStore } from '../store/authStore';

const AdminPage: React.FC = () => {
  const { user, isAuthenticated, isAdmin } = useAuthStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Mock data
  const mockUsers = [
    { id: '1', username: 'usuario1', email: 'usuario1@exemplo.com', subscription: 'premium', lastLogin: '2023-05-30' },
    { id: '2', username: 'usuario2', email: 'usuario2@exemplo.com', subscription: 'free', lastLogin: '2023-05-29' },
    { id: '3', username: 'usuario3', email: 'usuario3@exemplo.com', subscription: 'premium', lastLogin: '2023-05-28' },
  ];
  
  const mockStats = {
    totalUsers: 138,
    premiumUsers: 43,
    activeToday: 26,
    totalViews: 982,
  };
  
  // Redirecionar se não estiver autenticado ou não for admin
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate]);
  
  if (!isAuthenticated || !isAdmin) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2">Acesso Negado</h2>
            <p className="text-gray-300">Você não tem permissão para acessar esta página.</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 pt-32">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-4"
        >
          Painel Administrativo
        </motion.h1>
        <p className="text-gray-400 mb-10">
          Olá, {user?.username}. Gerencie usuários e conteúdo do site.
        </p>
        
        {/* Tabs */}
        <div className="border-b border-gray-700 mb-8">
          <div className="flex flex-wrap -mb-px">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`mr-4 py-2 px-1 border-b-2 font-medium ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`mr-4 py-2 px-1 border-b-2 font-medium ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Usuários
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`mr-4 py-2 px-1 border-b-2 font-medium ${
                activeTab === 'settings'
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Configurações
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatsCard title="Total de Usuários" value={mockStats.totalUsers} />
              <StatsCard title="Usuários Premium" value={mockStats.premiumUsers} />
              <StatsCard title="Ativos Hoje" value={mockStats.activeToday} />
              <StatsCard title="Visualizações Totais" value={mockStats.totalViews} />
            </div>
            
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-medium text-white mb-4">Atividade Recente</h3>
              <div className="space-y-4">
                <ActivityItem 
                  message="Novo usuário registrado" 
                  user="maria.silva" 
                  time="há 5 minutos" 
                />
                <ActivityItem 
                  message="Assinatura atualizada para Premium" 
                  user="joao.santos" 
                  time="há 2 horas" 
                />
                <ActivityItem 
                  message="Nova avaliação de filme" 
                  user="pedro.oliveira" 
                  time="há 1 dia" 
                />
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-xl font-medium text-white">Gerenciar Usuários</h3>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">
                  Adicionar Usuário
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-700/50">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Usuário
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Assinatura
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Último Login
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-700/50">
                        <td className="py-4 px-6 text-sm font-medium text-white">
                          {user.username}
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-300">
                          {user.email}
                        </td>
                        <td className="py-4 px-6 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.subscription === 'premium' 
                              ? 'bg-blue-900/50 text-blue-400' 
                              : 'bg-gray-700 text-gray-300'
                          }`}>
                            {user.subscription === 'premium' ? 'Premium' : 'Gratuito'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-300">
                          {user.lastLogin}
                        </td>
                        <td className="py-4 px-6 text-sm">
                          <button className="text-blue-500 hover:text-blue-400 mr-3">
                            Editar
                          </button>
                          <button className="text-red-500 hover:text-red-400">
                            Deletar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-medium text-white mb-6">Configurações do Site</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome do Site
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue="CineStorm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Descrição
                </label>
                <textarea 
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  defaultValue="Sua plataforma premium de streaming de filmes."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Limite de Visualizações (Plano Gratuito)
                </label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  defaultValue={3}
                />
              </div>
              
              <div className="pt-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition">
                  Salvar Configurações
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

interface StatsCardProps {
  title: string;
  value: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
};

interface ActivityItemProps {
  message: string;
  user: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ message, user, time }) => {
  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-700 last:border-0 last:pb-0">
      <div>
        <p className="text-white">{message}</p>
        <p className="text-sm text-blue-400">{user}</p>
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
};

export default AdminPage;