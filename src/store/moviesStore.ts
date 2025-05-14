import { create } from 'zustand';
import { Movie, Genre } from '../types';
import { fetchPopularMovies, fetchTopRatedMovies, fetchGenres, searchMovies } from '../utils/tmdb';

interface MoviesState {
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  searchResults: Movie[];
  genres: Genre[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  
  fetchPopular: () => Promise<void>;
  fetchTopRated: () => Promise<void>;
  fetchAllGenres: () => Promise<void>;
  searchMoviesAction: (query: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
}

export const useMoviesStore = create<MoviesState>((set, get) => ({
  popularMovies: [],
  topRatedMovies: [],
  searchResults: [],
  genres: [],
  loading: false,
  error: null,
  searchQuery: '',
  
  fetchPopular: async () => {
    set({ loading: true, error: null });
    try {
      const movies = await fetchPopularMovies();
      set({ popularMovies: movies, loading: false });
    } catch (error) {
      set({ error: 'Erro ao carregar filmes populares', loading: false });
    }
  },
  
  fetchTopRated: async () => {
    set({ loading: true, error: null });
    try {
      const movies = await fetchTopRatedMovies();
      set({ topRatedMovies: movies, loading: false });
    } catch (error) {
      set({ error: 'Erro ao carregar filmes mais bem avaliados', loading: false });
    }
  },
  
  fetchAllGenres: async () => {
    try {
      const genres = await fetchGenres();
      set({ genres });
    } catch (error) {
      set({ error: 'Erro ao carregar gêneros' });
    }
  },
  
  searchMoviesAction: async (query: string) => {
    if (!query.trim()) {
      set({ searchResults: [] });
      return;
    }
    
    set({ loading: true, error: null });
    try {
      const results = await searchMovies(query);
      set({ searchResults: results, loading: false });
    } catch (error) {
      set({ error: 'Erro ao buscar filmes', loading: false });
    }
  },
  
  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  }
}));