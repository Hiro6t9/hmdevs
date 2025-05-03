
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Add animation complete flag after initial render
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled || isOpen ? 'bg-white/10 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className={`flex items-center space-x-2 text-couple-rose-pink transition-opacity duration-500 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setIsOpen(false)}
          >
            <Heart className="w-6 h-6 animate-heartbeat" />
            <span className="font-semibold text-lg gradient-text">Mayu & Hiro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink to="/" label="Home" />
            <NavLink to="/about" label="About Us" />
            <NavLink to="/projects" label="Projects" />
            <NavLink to="/contact" label="Contact" />
          </div>

          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-transform hover:scale-105 active:scale-95"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-couple-rose-pink" />
            ) : (
              <Menu className="w-5 h-5 text-couple-rose-pink" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/10 backdrop-blur-lg animate-fade-in-up border-t border-white/20">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLink to="/" label="Home" onClick={() => setIsOpen(false)} />
            <MobileNavLink to="/about" label="About Us" onClick={() => setIsOpen(false)} />
            <MobileNavLink to="/projects" label="Projects" onClick={() => setIsOpen(false)} />
            <MobileNavLink to="/contact" label="Contact" onClick={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </nav>
  );
};

// NavLink for desktop
const NavLink = ({ to, label }: { to: string; label: string }) => {
  return (
    <Link 
      to={to} 
      className="relative font-medium text-foreground hover:text-couple-rose-pink transition-colors duration-300 group"
    >
      {label}
      <span className="absolute left-0 bottom-0 w-full h-0.5 bg-couple-rose-pink scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
    </Link>
  );
};

// NavLink for mobile
const MobileNavLink = ({ to, label, onClick }: { to: string; label: string; onClick: () => void }) => {
  return (
    <Link 
      to={to} 
      className="block py-2 px-4 text-foreground hover:bg-white/20 rounded-md transition-colors duration-300 hover:text-couple-rose-pink"
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Navigation;
