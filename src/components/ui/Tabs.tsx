import React, { createContext, useContext, useState } from 'react';

type TabsContextType = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs: React.FC<{
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}> = ({ children, value, onValueChange }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <div className={`flex space-x-1 ${className}`}>
      {children}
    </div>
  );
};

export const TabsTrigger: React.FC<{
  children: React.ReactNode;
  value: string;
  className?: string;
}> = ({ children, value, className = '' }) => {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsTrigger must be used within Tabs');
  }
  
  const isActive = context.value === value;
  
  return (
    <button
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
        ${isActive 
          ? 'bg-blue-600 text-white' 
          : 'text-gray-400 hover:text-white hover:bg-gray-700'
        } ${className}`}
      onClick={() => context.onValueChange(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<{
  children: React.ReactNode;
  value: string;
  className?: string;
}> = ({ children, value, className = '' }) => {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsContent must be used within Tabs');
  }
  
  return context.value === value ? (
    <div className={className}>{children}</div>
  ) : null;
};