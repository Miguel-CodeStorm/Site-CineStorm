import React from 'react';
import { Motion, useMotionValue, useTransform, motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <Zap size={24} className="text-blue-500" />
        <motion.div 
          className="absolute inset-0 bg-purple-500 blur-sm rounded-full opacity-50"
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </div>
      <h1 className="text-2xl font-bold text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          Cine
        </span>
        <span className="text-white">Storm</span>
      </h1>
    </motion.div>
  );
};

export default Logo;