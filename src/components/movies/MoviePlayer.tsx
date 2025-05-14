import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { incrementWatchCount, hasReachedDailyLimit } from '../../utils/localStorage';
import { useAuthStore } from '../../store/authStore';

interface MoviePlayerProps {
  movieId: number;
}

const MoviePlayer: React.FC<MoviePlayerProps> = ({ movieId }) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, subscription } = useAuthStore();
  const limit = 3; // Limite para usuários free
  
  // Verificar se o usuário atingiu o limite diário para o plano gratuito
  const limitReached = 
    isAuthenticated && 
    subscription === 'free' && 
    hasReachedDailyLimit(limit);
  
  // Se o usuário não atingiu o limite, incremente o contador
  const incrementViewCount = () => {
    if (isAuthenticated && subscription === 'free') {
      incrementWatchCount();
    }
  };
  
  const handleLoad = () => {
    setIsLoading(false);
    
    // Só incrementa o contador se o iframe carregou com sucesso
    if (!isError && !limitReached) {
      incrementViewCount();
    }
  };
  
  const handleError = () => {
    setIsError(true);
    setIsLoading(false);
  };
  
  if (limitReached) {
    return (
      <div className="bg-gray-900 rounded-lg p-8 text-center">
        <h2 className="text-xl font-bold text-red-500 mb-4">Limite de Visualizações Atingido</h2>
        <p className="text-gray-300 mb-4">
          Você já assistiu {limit} filmes hoje com seu plano gratuito.
        </p>
        <p className="text-gray-400">
          Faça upgrade para o plano Premium para assistir filmes ilimitados.
        </p>
        <a 
          href="/subscription" 
          className="inline-block mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
        >
          Ver Planos Premium
        </a>
      </div>
    );
  }
  
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      )}
      
      {isError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 p-8 text-center">
          <AlertTriangle size={48} className="text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">
            Não foi possível carregar o filme
          </h2>
          <p className="text-gray-400">
            Por favor, tente outro filme ou volte mais tarde.
          </p>
        </div>
      ) : (
        <iframe 
          src={`https://vidsrc.to/embed/movie/${movieId}`}
          onLoad={handleLoad}
          onError={handleError}
          allowFullScreen
          width="100%" 
          height="100%"
          className="border-0"
        ></iframe>
      )}
    </div>
  );
};

export default MoviePlayer;