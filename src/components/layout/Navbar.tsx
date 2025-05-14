import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { Menu, X, LogOut, User } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Verifica a sessão ativa
    const getSession = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getSession();

    // Listener para manter a sessão atualizada
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (event === 'SIGNED_IN') {
        setUser(session?.user);
      }
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login');
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/90 py-2 shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          <span className="text-blue-500">Cine</span>Storm
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-white">
          <Link to="/" className={location.pathname === '/' ? 'font-bold' : ''}>Início</Link>
          <Link to="/categories" className={location.pathname === '/categories' ? 'font-bold' : ''}>Categorias</Link>
          <Link to="/favorites" className={location.pathname === '/favorites' ? 'font-bold' : ''}>Favoritos</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-white flex items-center gap-2">
                <User size={18} />
                <span>{user.email}</span>
              </Link>
              <button onClick={handleLogout} className="text-red-400 hover:text-white flex items-center gap-2">
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium">
              Entrar
            </Link>
          )}
        </div>

        {/* Botão mobile */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-black/95 px-4 py-4 text-white space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)}>Início</Link>
          <Link to="/categories" onClick={() => setIsOpen(false)}>Categorias</Link>
          <Link to="/favorites" onClick={() => setIsOpen(false)}>Favoritos</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>Minha Conta</Link>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-red-400">
                Sair
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="bg-blue-600 py-2 px-4 rounded text-white block text-center">
              Entrar
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
