import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import Layout from '../components/layout/Layout';
import MovieHero from '../components/movies/MovieHero';
import MovieSlider from '../components/movies/MovieSlider';
import { fetchMovieDetails, fetchMoviesByGenre } from '../utils/tmdb';
import { MovieDetails, Movie } from '../types';

const MoviePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [activeTab, setActiveTab] = useState('about');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const movieData = await fetchMovieDetails(id);
        setMovie(movieData);

        if (movieData.genres && movieData.genres.length > 0) {
          const genreId = movieData.genres[0].id;
          const similarMoviesData = await fetchMoviesByGenre(genreId);
          setSimilarMovies(similarMoviesData.filter((m: Movie) => m.id !== movieData.id));
        }
      } catch (err) {
        setError('Não foi possível carregar os detalhes do filme');
        console.error('Erro ao carregar dados do filme:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handlePlayClick = () => {
    setActiveTab('watch');
    document.getElementById('movie-tabs')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      </Layout>
    );
  }

  if (error || !movie) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2">Erro</h2>
            <p className="text-gray-300">{error || 'Filme não encontrado'}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <MovieHero movie={movie} onPlayClick={handlePlayClick} />

      <div id="movie-tabs" className="container mx-auto px-4 py-10">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-800 p-1 rounded-lg mb-6">
            <TabsTrigger value="about">Sobre</TabsTrigger>
            <TabsTrigger value="watch">Assistir</TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <h3 className="text-xl font-bold text-white mb-4">Informações</h3>
                  <div className="bg-gray-800 rounded-lg p-6">
                    <InfoItem label="Status" value={movie.status} />
                    <InfoItem label="Data de Lançamento" value={new Date(movie.release_date).toLocaleDateString('pt-BR')} />
                    <InfoItem label="Duração" value={`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`} />
                    <InfoItem label="Gêneros" value={movie.genres.map(g => g.name).join(', ')} />
                    <InfoItem label="Avaliação" value={`${movie.vote_average.toFixed(1)}/10`} />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold text-white mb-4">Sinopse</h3>
                  <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <p className="text-gray-300 leading-relaxed">{movie.overview || 'Sem sinopse disponível.'}</p>
                  </div>

                  {movie.credits && movie.credits.cast && movie.credits.cast.length > 0 && (
                    <>
                      <h3 className="text-xl font-bold text-white mb-4">Elenco Principal</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {movie.credits.cast.slice(0, 5).map(actor => (
                          <div key={actor.id} className="bg-gray-800 rounded-lg overflow-hidden">
                            <img
                              src={
                                actor.profile_path
                                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                  : 'https://via.placeholder.com/200x300?text=Sem+Imagem'
                              }
                              alt={actor.name}
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-3">
                              <p className="font-medium text-white">{actor.name}</p>
                              <p className="text-sm text-gray-400">{actor.character}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="watch">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={`https://vidsrc.to/embed/movie/${id}`}
                  title="Player de Filme"
                  allowFullScreen
                  frameBorder="0"
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        {similarMovies.length > 0 && (
          <div className="mt-16">
            <MovieSlider title="Filmes Similares" movies={similarMovies} />
          </div>
        )}
      </div>
    </Layout>
  );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="mb-4 last:mb-0">
    <p className="text-gray-400 text-sm">{label}</p>
    <p className="text-white font-medium">{value}</p>
  </div>
);

export default MoviePage;
