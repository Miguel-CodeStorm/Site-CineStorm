import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

// Páginas
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import SearchPage from './pages/SearchPage';
import CategoriesPage from './pages/CategoriesPage';
import FavoritesPage from './pages/FavoritesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RecoverPage from './pages/RecoverPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import SubscriptionPage from './pages/SubscriptionPage';
import ConfirmadoPage from './pages/ConfirmadoPage';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };

    loadSession();

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-10">Carregando...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover" element={<RecoverPage />} />
        <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user ? <AdminPage /> : <Navigate to="/login" />} />
        <Route path="/subscription" element={user ? <SubscriptionPage /> : <Navigate to="/login" />} />
        <Route path="/confirmado" element={<ConfirmadoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
