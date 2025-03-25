import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: 'Contador', href: '#contador' },
    { name: 'Momentos', href: '#galeria' },
    { name: 'Memórias', href: '#timeline' },
    { name: 'Mensagem', href: '#mensagem' },
    { name: 'Filmes', href: '#filmes' },
    { name: 'Músicas', href: '#musicas' },
    { name: 'Sonhos', href: '#sonhos' }
  ];

  return (
    <nav className="fixed w-full bg-lime-950/50 shadow-lg z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-end items-center">
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className="hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-primary hover:text-white"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background pb-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            {menuItems.map((item) => (
              <a 
                key={item.name}
                href={item.href} 
                className="block hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
