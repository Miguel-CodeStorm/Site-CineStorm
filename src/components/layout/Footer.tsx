import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import Logo from '../ui/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/90 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-gray-400">
              Sua plataforma premium de streaming de filmes com os melhores títulos do cinema.
            </p>
            <div className="flex mt-4 space-x-4">
              <SocialIcon icon={<Facebook size={20} />} href="#" />
              <SocialIcon icon={<Twitter size={20} />} href="#" />
              <SocialIcon icon={<Instagram size={20} />} href="#" />
              <SocialIcon icon={<Youtube size={20} />} href="#" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Navegação</h3>
            <ul className="space-y-2">
              <FooterLink to="/" label="Início" />
              <FooterLink to="/categories" label="Categorias" />
              <FooterLink to="/search" label="Busca" />
              <FooterLink to="/favorites" label="Favoritos" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Conta</h3>
            <ul className="space-y-2">
              <FooterLink to="/login" label="Entrar" />
              <FooterLink to="/register" label="Cadastrar" />
              <FooterLink to="/dashboard" label="Minha Conta" />
              <FooterLink to="/subscription" label="Planos de Assinatura" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Informações</h3>
            <ul className="space-y-2">
              <FooterLink to="/about" label="Sobre Nós" />
              <FooterLink to="/terms" label="Termos de Serviço" />
              <FooterLink to="/privacy" label="Política de Privacidade" />
              <FooterLink to="/contact" label="Contato" />
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} CineStorm. Todos os direitos reservados.</p>
          <p className="mt-2">
            Este produto usa a API TMDB mas não é endossado ou certificado pelo TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label }) => {
  return (
    <li>
      <Link to={to} className="text-gray-400 hover:text-blue-400 transition">
        {label}
      </Link>
    </li>
  );
};

interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, href }) => {
  return (
    <a
      href={href}
      className="bg-gray-800 hover:bg-blue-600 transition-colors rounded-full w-10 h-10 flex items-center justify-center"
    >
      {icon}
    </a>
  );
};

export default Footer;