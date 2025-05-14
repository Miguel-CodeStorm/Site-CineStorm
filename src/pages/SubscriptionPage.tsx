import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import SubscriptionCard from '../components/subscription/SubscriptionCard';
import { useAuthStore } from '../store/authStore';

const SubscriptionPage: React.FC = () => {
  const { subscription } = useAuthStore();
  
  const subscriptions = [
    {
      id: 'free',
      name: 'Plano Gratuito',
      price: 0,
      features: [
        'Acesso a filmes populares',
        'Limite de 3 filmes por dia',
        'Qualidade de vídeo padrão',
        'Com anúncios'
      ]
    },
    {
      id: 'premium',
      name: 'Plano Premium',
      price: 29.90,
      features: [
        'Acesso ilimitado a todos os filmes',
        'Sem limite diário',
        'Qualidade de vídeo HD',
        'Sem anúncios',
        'Suporte prioritário'
      ]
    }
  ];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 pt-32">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Planos de Assinatura
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Escolha o plano perfeito para você e desfrute da melhor experiência de streaming.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {subscriptions.map((sub) => (
            <SubscriptionCard 
              key={sub.id} 
              subscription={sub} 
              isActive={subscription === sub.id} 
            />
          ))}
        </div>
        
        <div className="mt-16 text-center text-gray-400 max-w-2xl mx-auto">
          <h3 className="text-white text-xl font-bold mb-4">Perguntas Frequentes</h3>
          
          <div className="space-y-6 text-left">
            <FAQItem 
              question="Como funciona o limite do plano gratuito?" 
              answer="No plano gratuito, você pode assistir até 3 filmes por dia. O contador é reiniciado à meia-noite no seu horário local."
            />
            <FAQItem 
              question="Posso cancelar minha assinatura a qualquer momento?" 
              answer="Sim, você pode cancelar sua assinatura Premium a qualquer momento. O acesso premium continuará até o final do período faturado."
            />
            <FAQItem 
              question="Quais métodos de pagamento são aceitos?" 
              answer="Aceitamos cartões de crédito, débito, PayPal e Pix para o pagamento de assinaturas Premium."
            />
            <FAQItem 
              question="Posso mudar de plano depois?" 
              answer="Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento através do seu painel de usuário."
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  return (
    <div className="pb-4 border-b border-gray-800">
      <h4 className="text-white font-medium mb-2">{question}</h4>
      <p className="text-gray-400">{answer}</p>
    </div>
  );
};

export default SubscriptionPage;