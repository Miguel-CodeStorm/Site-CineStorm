import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, User, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';
import { useAuthStore } from '../../store/authStore';
import { useMoviesStore } from '../../store/moviesStore';

const Navbar: React.FC = () => {
  const {
    isAuthenticated,
    user,
    logout,
    initAuth
  } = useAuthStore();

  const { searchQuery, setSearchQuery } = useMoviesStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Checar status de login ao montar o componente
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md py-2 shadow-lg'
          : 'bg-gradient-to-b from-black/80 to-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/" label="Início" active={location.pathname === '/'} />
            <NavLink to="/categories" label="Categorias" active={location.pathname === '/categories'} />
            <NavLink to="/favorites" label="Favoritos" active={location.pathname === '/favorites'} />
            {isAuthenticated && user?.isAdmin && (
              <NavLink to="/admin" label="Admin" active={location.pathname === '/admin'} />
            )}
          </nav>

          {/* Search Form */}
          <div className="hidden md:block relative">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Buscar filmes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-800/60 border border-gray-700 rounded-full py-2 px-4 pr-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
              />
              <button type="submit" className="absolute right-3 text-gray-400 hover:text-white">
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center">
                <Link to="/dashboard" className="text-white hover:text-blue-400 flex items-center">
                  <User size={18} className="mr-2" />
                  <span>{user?.username || 'Usuário'}</span>
                </Link>
                <button
                  onClick={() => logout()}
                  className="ml-4 text-white/70 hover:text-white flex items-center"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-4 rounded-full transition"
              >
                Entrar
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar filmes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-md w-full py-2 px-4 pr-10 text-white"
                  />
                  <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
                    <Search size={18} />
                  </button>
                </div>
              </form>

              <nav className="flex flex-col space-y-3">
                <MobileNavLink to="/" label="Início" onClick={() => setIsOpen(false)} />
                <MobileNavLink to="/categories" label="Categorias" onClick={() => setIsOpen(false)} />
                <MobileNavLink to="/favorites" label="Favoritos" onClick={() => setIsOpen(false)} />
                {isAuthenticated ? (
                  <>
                    <MobileNavLink to="/dashboard" label="Minha Conta" onClick={() => setIsOpen(false)} />
                    {user?.isAdmin && (
                      <MobileNavLink to="/admin" label="Admin" onClick={() => setIsOpen(false)} />
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="text-left text-red-400 py-2 flex items-center"
                    >
                      <LogOut size={18} className="mr-2" />
                      Sair
                    </button>
                  </>
                ) : (
                  <MobileNavLink
                    to="/login"
                    label="Entrar / Cadastrar"
                    onClick={() => setIsOpen(false)}
                    className="bg-blue-600 py-2 px-4 rounded-md text-center"
                  />
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, active, className }) => {
  return (
    <Link
      to={to}
      className={`relative font-medium ${
        active ? 'text-white' : 'text-gray-300 hover:text-white'
      } transition-colors ${className}`}
    >
      {label}
      {active && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500"
        />
      )}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, label, onClick, className }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-white py-2 block ${className}`}
    >
      {label}
    </Link>
  );
};

export default Navbar;
