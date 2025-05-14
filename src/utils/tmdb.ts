const API_KEY = '47526fcf1fe61eebee100198e7402d19';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string | null, size: string = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=Sem+Imagem';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const fetchPopularMovies = async (page: number = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchTopRatedMovies = async (page: number = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=pt-BR&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (id: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits,videos`
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar detalhes do filme (status: ${response.status})`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro em fetchMovieDetails:', error);
    throw new Error('Filme não encontrado ou houve um erro ao buscar os dados');
  }
};

export const fetchMoviesByGenre = async (genreId: number, page: number = 1) => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${genreId}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};

export const fetchGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`
  );
  const data = await response.json();
  return data.genres;
};

export const searchMovies = async (query: string, page: number = 1) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${query}&page=${page}`
  );
  const data = await response.json();
  return data.results;
};
