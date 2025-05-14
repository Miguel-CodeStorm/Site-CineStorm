import React from 'react';
import { motion } from 'framer-motion';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ 
        backgroundImage: `url(https://images.pexels.com/photos/7991158/pexels-photo-7991158.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1)` 
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="text-center mb-8">
          <a href="/" className="inline-block">
            <h1 className="text-3xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                Cine
              </span>
              <span className="text-white">Storm</span>
            </h1>
          </a>
        </div>
        
        <RegisterForm />
      </motion.div>
    </div>
  );
};

export default RegisterPage;