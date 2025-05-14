import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import { useAuthStore } from './store/authStore';

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
  const {
    user,
    isAuthenticated,
    isAdmin,
    setLoading,
    loading,
    setUserFromSession,
    logout,
  } = useAuthStore();

  useEffect(() => {
    const initializeSession = async () => {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();
      const session = data?.session;

      if (session?.user && !error) {
        setUserFromSession(session.user);
      } else {
        logout();
      }

      setLoading(false);
    };

    initializeSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserFromSession(session.user);
      } else {
        logout();
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [setUserFromSession, logout, setLoading]);

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
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recover" element={<RecoverPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminPage /> : <Navigate to="/login" />} />
        <Route path="/subscription" element={isAuthenticated ? <SubscriptionPage /> : <Navigate to="/login" />} />
        <Route path="/confirmado" element={<ConfirmadoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
