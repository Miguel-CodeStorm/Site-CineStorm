import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Clock } from 'lucide-react';
import { MovieDetails, Genre } from '../../types';
import { getImageUrl } from '../../utils/tmdb';
import Button from '../ui/Button';

interface MovieHeroProps {
  movie: MovieDetails;
  onPlayClick: () => void;
}

const MovieHero: React.FC<MovieHeroProps> = ({ movie, onPlayClick }) => {
  // Formatar a duração para horas e minutos
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };
  
  return (
    <div className="relative">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'original')})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 pt-32 lg:pt-40 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Poster */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl shadow-blue-900/20 max-w-xs mx-auto lg:max-w-none">
              <img 
                src={getImageUrl(movie.poster_path, 'w500')} 
                alt={movie.title} 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </motion.div>
          
          {/* Info */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {movie.title}
            </h1>
            
            {movie.tagline && (
              <p className="text-lg text-blue-400 italic mt-2">
                "{movie.tagline}"
              </p>
            )}
            
            {/* Movie Metadata */}
            <div className="flex flex-wrap items-center mt-4 text-sm text-gray-300 gap-y-2">
              <div className="flex items-center mr-6">
                <Star size={16} className="text-yellow-500 mr-1" />
                <span>{movie.vote_average.toFixed(1)}/10</span>
              </div>
              
              <div className="flex items-center mr-6">
                <Clock size={16} className="text-gray-400 mr-1" />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
              
              <div className="flex items-center">
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
            </div>
            
            {/* Genres */}
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.map((genre: Genre) => (
                <span 
                  key={genre.id}
                  className="px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            
            {/* Overview */}
            <p className="mt-6 text-gray-300 leading-relaxed max-w-2xl">
              {movie.overview}
            </p>
            
            {/* Button */}
            <div className="mt-8">
              <Button 
                onClick={onPlayClick}
                className="flex items-center gap-2 px-6 py-3"
              >
                <Play size={20} fill="white" />
                Assistir Agora
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MovieHero;