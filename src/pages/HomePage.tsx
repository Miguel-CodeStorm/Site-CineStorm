import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Layout from '../components/layout/Layout';
import MovieSlider from '../components/movies/MovieSlider';
import { useMoviesStore } from '../store/moviesStore';
import { Movie } from '../types';
import { getImageUrl } from '../utils/tmdb';

const HomePage: React.FC = () => {
  const { popularMovies, topRatedMovies, fetchPopular, fetchTopRated, loading } = useMoviesStore();
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });
  
  useEffect(() => {
    fetchPopular();
    fetchTopRated();
  }, []);
  
  useEffect(() => {
    if (popularMovies.length > 0) {
      // Seleciona um filme aleatório dos populares para o destaque
      const randomIndex = Math.floor(Math.random() * Math.min(5, popularMovies.length));
      setFeaturedMovie(popularMovies[randomIndex]);
    }
  }, [popularMovies]);
  
  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);
  
  return (
    <Layout>
      {/* Hero Section */}
      {featuredMovie && (
        <div className="relative w-full h-[70vh] min-h-[500px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${getImageUrl(featuredMovie.backdrop_path, 'original')})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-2xl"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {featuredMovie.title}
                </h1>
                <p className="text-lg text-gray-300 mb-6 line-clamp-3">
                  {featuredMovie.overview}
                </p>
                <a
                  href={`/movie/${featuredMovie.id}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
                >
                  Assistir Agora
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      )}
      
      {/* Movie Lists */}
      <div className="py-12">
        {loading && !popularMovies.length ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <>
            <MovieSlider title="Filmes Populares" movies={popularMovies} />
            
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              transition={{ duration: 0.5 }}
            >
              <MovieSlider title="Melhores Avaliados" movies={topRatedMovies} />
            </motion.div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;