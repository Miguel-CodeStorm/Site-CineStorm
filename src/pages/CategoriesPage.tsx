import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import MovieCard from '../components/ui/Card';
import { fetchGenres, fetchMoviesByGenre } from '../utils/tmdb';
import { Genre, Movie } from '../types';

const CategoriesPage: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await fetchGenres();
        setGenres(genresData);
        
        // Selecionar o primeiro gênero como padrão
        if (genresData.length > 0) {
          setSelectedGenre(genresData[0]);
        }
      } catch (err) {
        setError('Erro ao carregar categorias');
      }
    };
    
    loadGenres();
  }, []);
  
  useEffect(() => {
    if (!selectedGenre) return;
    
    const loadMoviesByGenre = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const movies = await fetchMoviesByGenre(selectedGenre.id);
        setMovies(movies);
      } catch (err) {
        setError('Erro ao carregar filmes desta categoria');
      } finally {
        setLoading(false);
      }
    };
    
    loadMoviesByGenre();
  }, [selectedGenre]);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-20 pt-32">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-white mb-8"
        >
          Categorias
        </motion.h1>
        
        {/* Filtros de Gênero */}
        <div className="mb-10 overflow-x-auto pb-4">
          <div className="flex space-x-2">
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedGenre?.id === genre.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 border border-red-500 rounded-md p-4 text-center">
            <p className="text-red-200">{error}</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedGenre?.name || 'Filmes'}
            </h2>
            
            {movies.length === 0 ? (
              <p className="text-gray-400 text-center py-10">
                Nenhum filme encontrado nesta categoria.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {movies.map((movie, index) => (
                  <MovieCard key={movie.id} movie={movie} index={index} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default CategoriesPage;