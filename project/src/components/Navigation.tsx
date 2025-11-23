import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // If we're not on the home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // We're already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    if (path === '/') {
      navigate('/');
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Clickable */}
            <button
              onClick={handleLogoClick}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            >
              <Sparkles className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-900">AI Tools Hub</span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('/')}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm"
              >
                AI Tools
              </button>
              <button
                onClick={() => scrollToSection('mentor')}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm"
              >
                Mentor
              </button>
              <button
                onClick={() => scrollToSection('partners')}
                className="text-gray-700 hover:text-purple-600 transition-colors duration-200 font-medium text-sm"
              >
                Organisations
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button
                  onClick={() => scrollToSection('home')}
                  className="block w-full text-left px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium border-b border-gray-100"
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavigation('/')}
                  className="block w-full text-left px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium border-b border-gray-100"
                >
                  AI Tools
                </button>
                <button
                  onClick={() => scrollToSection('mentor')}
                  className="block w-full text-left px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium border-b border-gray-100"
                >
                  Mentor
                </button>
                <button
                  onClick={() => scrollToSection('partners')}
                  className="block w-full text-left px-3 py-3 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
                >
                  Organisations
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed navigation */}
      <div className="h-16"></div>
    </>
  );
};

export default Navigation;