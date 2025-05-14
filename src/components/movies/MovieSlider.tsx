import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Movie } from '../../types';
import MovieCard from '../ui/Card';

interface MovieSliderProps {
  title: string;
  movies: Movie[];
}

const MovieSlider: React.FC<MovieSliderProps> = ({ title, movies }) => {
  const [startIndex, setStartIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const itemsPerSlide = getItemsPerSlide();
  
  // Calcula quantos itens mostrar por slide baseado no tamanho da tela
  function getItemsPerSlide() {
    if (typeof window === 'undefined') return 5;
    
    const width = window.innerWidth;
    if (width < 640) return 2; // Mobile
    if (width < 768) return 3; // Small tablet
    if (width < 1024) return 4; // Tablet
    if (width < 1280) return 5; // Small desktop
    return 6; // Large desktop
  }
  
  const hasMore = startIndex + itemsPerSlide < movies.length;
  const hasPrev = startIndex > 0;
  
  const handleNext = () => {
    if (hasMore) {
      setStartIndex(Math.min(startIndex + itemsPerSlide, movies.length - itemsPerSlide));
    }
  };
  
  const handlePrev = () => {
    if (hasPrev) {
      setStartIndex(Math.max(startIndex - itemsPerSlide, 0));
    }
  };
  
  if (!movies || movies.length === 0) {
    return null;
  }
  
  return (
    <div className="my-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-white"
          >
            {title}
          </motion.h2>
          
          <div className="flex space-x-2">
            <button 
              onClick={handlePrev}
              disabled={!hasPrev}
              className={`p-2 rounded-full ${
                hasPrev 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext}
              disabled={!hasMore}
              className={`p-2 rounded-full ${
                hasMore 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
              }`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div className="relative overflow-hidden" ref={sliderRef}>
          <div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          >
            {movies.slice(startIndex, startIndex + itemsPerSlide).map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSlider;