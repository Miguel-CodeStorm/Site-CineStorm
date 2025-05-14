import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import MovieCard from '../components/ui/Card';
import { getFavorites } from '../utils/localStorage';
import { Movie } from '../types';

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  
  useEffect(() => {
    // Carregar favoritos do localStorage
    const favMovies = getFavorites();
    setFavorites(favMovies);
    
    // Adicionar um listener para atualizar os favoritos quando o localStorage mudar
    const handleStorageChange = () => {
      const updatedFavorites = getFavorites();
      setFavorites(updatedFavorites);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Criar um evento personalizado para o componente MovieCard atualizar esta página
    const handleFavUpdate = () => {
      const updatedFavorites = getFavorites();
      setFavorites(updatedFavorites);
    };
    
    window.addEventListener('favoritesUpdated', handleFavUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesUpdated', handleFavUpdate);
    };
  }, []);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 pt-32">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-10"
        >
          Meus Favoritos
        </motion.h1>
        
        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">
              Você ainda não adicionou nenhum filme aos favoritos.
            </p>
            <a 
              href="/" 
              className="text-blue-500 hover:text-blue-400 transition"
            >
              Explorar filmes
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {favorites.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FavoritesPage;