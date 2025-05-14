import { Movie } from '../types';

// Manipular filmes favoritos
export const addFavorite = (movie: Movie) => {
  const favorites = getFavorites();
  const exists = favorites.some((fav) => fav.id === movie.id);
  
  if (!exists) {
    localStorage.setItem('favorites', JSON.stringify([...favorites, movie]));
    return true;
  }
  
  return false;
};

export const removeFavorite = (movieId: number) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

export const getFavorites = (): Movie[] => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

export const isFavorite = (movieId: number): boolean => {
  const favorites = getFavorites();
  return favorites.some((movie) => movie.id === movieId);
};

// Gerenciar visualizações para usuários gratuitos
export const getWatchCount = (): number => {
  const today = new Date().toISOString().split('T')[0];
  const watchData = localStorage.getItem('watchData');
  
  if (!watchData) return 0;
  
  const parsedData = JSON.parse(watchData);
  return parsedData.date === today ? parsedData.count : 0;
};

export const incrementWatchCount = () => {
  const today = new Date().toISOString().split('T')[0];
  const count = getWatchCount() + 1;
  
  localStorage.setItem('watchData', JSON.stringify({ date: today, count }));
  return count;
};

export const hasReachedDailyLimit = (limit: number = 3): boolean => {
  return getWatchCount() >= limit;
};