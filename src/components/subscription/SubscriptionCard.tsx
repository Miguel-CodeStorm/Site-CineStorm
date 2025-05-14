import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Subscription } from '../../types';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';

interface SubscriptionCardProps {
  subscription: Subscription;
  isActive?: boolean;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ 
  subscription, 
  isActive = false 
}) => {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className={`bg-gray-800 rounded-lg overflow-hidden shadow-xl ${
        isActive ? 'border-2 border-blue-500 transform scale-105' : ''
      }`}
    >
      {isActive && (
        <div className="bg-blue-600 py-1 text-center text-white text-sm font-medium">
          Plano Atual
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white">{subscription.name}</h3>
        
        <div className="mt-4 mb-6">
          <p className="text-3xl font-bold text-white">
            {subscription.price > 0 ? (
              <>
                R${subscription.price.toFixed(2)}
                <span className="text-sm text-gray-400 font-normal">/mês</span>
              </>
            ) : (
              'Grátis'
            )}
          </p>
        </div>
        
        <ul className="space-y-3 mb-6">
          {subscription.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button
          variant={isActive ? 'secondary' : 'primary'}
          fullWidth
          disabled={isActive}
        >
          {isActive ? 'Plano Atual' : isAuthenticated ? 'Fazer Upgrade' : 'Escolher Plano'}
        </Button>
      </div>
    </motion.div>
  );
};

export default SubscriptionCard;