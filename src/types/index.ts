export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  genres?: Genre[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface User {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  subscription: 'free' | 'premium';
  createdAt: string;
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  features: string[];
  limit: number;
}