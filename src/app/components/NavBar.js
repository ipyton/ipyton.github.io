import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navBarStyles = {
  scrolled: 'bg-white/60 backdrop-blur-3xl backdrop-saturate-200 shadow-2xl border-b border-gray-200/60',
  initial: 'bg-black/15 backdrop-blur-3xl backdrop-saturate-200 shadow-2xl',
  logoScrolled: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-3xl font-bold',
  logoInitial: 'text-white drop-shadow-lg text-3xl font-bold',
  navItemActive: {
    scrolled: 'text-blue-700 bg-blue-100/80 backdrop-blur-sm shadow-md border border-blue-200 font-semibold',
    initial: 'text-white bg-white/20 backdrop-blur-md shadow-lg border border-white/40 font-semibold'
  },
  navItemInactive: {
    scrolled: 'text-gray-800 hover:text-blue-700 hover:bg-blue-50/80 backdrop-blur-sm border border-transparent hover:border-blue-200 font-medium',
    initial: 'text-white/95 hover:text-white hover:bg-white/20 backdrop-blur-md border border-white/30 hover:border-white/50 font-medium'
  }
};

const NavBar = ({ activeSection, setActiveSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Add scroll-based section detection
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setActiveSection]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
      ? navBarStyles.scrolled
      : navBarStyles.initial
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className={`transition-all duration-300 ${isScrolled
            ? 'text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
            : 'text-3xl font-bold text-white drop-shadow-lg'
            }`}>
            Noah's Portfolio
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href.slice(1))}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 ${activeSection === item.href.slice(1)
                  ? isScrolled
                    ? 'text-blue-700 bg-blue-100 shadow-md border-blue-200 font-semibold'
                    : 'text-white bg-white/25 backdrop-blur-sm shadow-lg border-white/30 font-semibold'
                  : isScrolled
                    ? 'text-gray-800 hover:text-blue-700 hover:bg-blue-50 border-transparent hover:border-blue-200 font-medium'
                    : 'text-white/95 hover:text-white hover:bg-white/25 backdrop-blur-sm border-white/20 hover:border-white/40 font-medium'
                  }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-3 rounded-lg transition-all duration-300 ${isScrolled
              ? 'text-gray-800 hover:bg-gray-100 border-2 border-gray-200'
              : 'text-white hover:bg-white/25 backdrop-blur-sm border-2 border-white/30'
              }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="bg-white/98 backdrop-blur-lg border-t-2 border-gray-200 rounded-b-2xl mx-2 mb-4 shadow-2xl">
              <div className="px-6 py-4 space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      scrollToSection(item.href.slice(1));
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-6 py-4 rounded-xl font-medium transition-all duration-200 border-2 ${activeSection === item.href.slice(1)
                      ? 'text-blue-700 bg-blue-100 shadow-md border-blue-200 font-semibold'
                      : 'text-gray-800 hover:text-blue-700 hover:bg-blue-50 border-transparent hover:border-blue-200'
                      }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar; 