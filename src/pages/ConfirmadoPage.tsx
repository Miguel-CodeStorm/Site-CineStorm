// src/pages/ConfirmadoPage.tsx
import React from 'react';
import Layout from '../components/layout/Layout';

const ConfirmadoPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-500 mb-4">E-mail confirmado com sucesso!</h1>
          <p className="text-gray-300">Você já pode fazer login e aproveitar o conteúdo do CineStorm.</p>
        </div>
      </div>
    </Layout>
  );
};

export default ConfirmadoPage;
