import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../utils/tmdb';
import { Movie } from '../../types';
import { isFavorite, addFavorite, removeFavorite } from '../../utils/localStorage';

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, index = 0 }) => {
  const [isFav, setIsFav] = React.useState(isFavorite(movie.id));
  
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFav) {
      removeFavorite(movie.id);
      setIsFav(false);
    } else {
      addFavorite(movie);
      setIsFav(true);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative group overflow-hidden rounded-lg"
    >
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="aspect-[2/3] overflow-hidden relative">
          <motion.img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold truncate">{movie.title}</h3>
              <p className="text-gray-300 text-sm mt-1">
                {new Date(movie.release_date).getFullYear()}
              </p>
              <div className="mt-2 flex items-center">
                <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getVoteColor(movie.vote_average)}`} 
                    style={{ width: `${movie.vote_average * 10}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-white">{movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      <button 
        onClick={handleFavorite}
        className="absolute top-2 right-2 p-2 bg-black/60 rounded-full text-white transition-transform duration-300 hover:scale-110"
      >
        <Heart 
          size={18} 
          className={isFav ? 'fill-red-500 text-red-500' : ''} 
        />
      </button>
    </motion.div>
  );
};

const getVoteColor = (vote: number) => {
  if (vote >= 7) return 'bg-green-500';
  if (vote >= 5) return 'bg-yellow-500';
  return 'bg-red-500';
};

export default MovieCard;