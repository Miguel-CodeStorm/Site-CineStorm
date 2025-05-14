import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import { searchMovies } from '../utils/tmdb';
import { Movie } from '../types';
import MovieCard from '../components/ui/Card';

const SearchPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!query) return;
    
    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (err) {
        setError('Ocorreu um erro ao buscar filmes');
        console.error('Erro na busca:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 pt-32">
        <div className="mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white"
          >
            {query ? `Resultados para: "${query}"` : 'Buscar Filmes'}
          </motion.h1>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 border border-red-500 rounded-md p-4 text-center">
            <p className="text-red-200">{error}</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-20">
            {query ? (
              <p className="text-gray-400 text-lg">
                Nenhum filme encontrado para "{query}".
              </p>
            ) : (
              <p className="text-gray-400 text-lg">
                Digite algo na barra de pesquisa para buscar filmes.
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;