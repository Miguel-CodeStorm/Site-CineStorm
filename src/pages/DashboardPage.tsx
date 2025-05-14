import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, User, Settings, CreditCard, Heart } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated, subscription, logout } = useAuthStore();
  const navigate = useNavigate();
  
  // Redirecionar para login se não estiver autenticado
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated || !user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
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
          className="text-3xl font-bold text-white mb-10"
        >
          Minha Conta
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna de informações do usuário */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                  <User size={32} className="text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{user.username}</h2>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-white font-medium mb-2">Plano Atual</h3>
                <div className={`py-2 px-3 rounded-md ${
                  subscription === 'premium' 
                    ? 'bg-blue-600/20 text-blue-400' 
                    : 'bg-gray-700/50 text-gray-300'
                }`}>
                  {subscription === 'premium' ? 'Premium' : 'Gratuito'}
                </div>
                
                {subscription !== 'premium' && (
                  <a 
                    href="/subscription" 
                    className="text-blue-500 hover:text-blue-400 text-sm block mt-2"
                  >
                    Fazer upgrade
                  </a>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-white font-medium mb-2">Membro desde</h3>
                <p className="text-gray-300">
                  {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              
              <Button 
                variant="danger"
                onClick={() => logout()}
                className="flex items-center justify-center gap-2"
                fullWidth
              >
                <LogOut size={18} />
                Sair da Conta
              </Button>
            </div>
          </div>
          
          {/* Coluna de ações e configurações */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              <DashboardCard 
                icon={<Heart size={24} className="text-red-500" />}
                title="Meus Favoritos"
                description="Gerenciar sua lista de filmes favoritos"
                buttonText="Ver Favoritos"
                buttonLink="/favorites"
              />
              
              <DashboardCard 
                icon={<Settings size={24} className="text-gray-400" />}
                title="Configurações"
                description="Editar perfil e preferências da conta"
                buttonText="Configurações"
                buttonLink="#"
              />
              
              <DashboardCard 
                icon={<CreditCard size={24} className="text-green-500" />}
                title="Assinatura"
                description="Gerenciar seu plano de assinatura atual"
                buttonText="Gerenciar Plano"
                buttonLink="/subscription"
              />
              
              {user.isAdmin && (
                <DashboardCard 
                  icon={<User size={24} className="text-blue-500" />}
                  title="Painel Admin"
                  description="Acesse o painel administrativo"
                  buttonText="Painel Admin"
                  buttonLink="/admin"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  icon,
  title,
  description,
  buttonText,
  buttonLink
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <div className="mr-3">{icon}</div>
        <h3 className="text-xl font-medium text-white">{title}</h3>
      </div>
      
      <p className="text-gray-400 mb-6 flex-grow">{description}</p>
      
      <a 
        href={buttonLink} 
        className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md text-center transition"
      >
        {buttonText}
      </a>
    </div>
  );
};

export default DashboardPage;