 import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const title = "Discover the Future of AI";
  const subtitle = "Explore 1000+ cutting-edge AI tools that are revolutionizing how we work, create, and innovate";

  const handleExploreClick = () => {
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
      // Use smooth scroll for desktop, instant scroll for mobile for better UX
      const isMobile = window.innerWidth < 768;
      
      if (isMobile) {
        // For mobile, use instant scroll or minimal smooth behavior
        toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Fallback: if smooth scroll doesn't work well on some mobile devices
        setTimeout(() => {
          const currentPosition = window.pageYOffset;
          const targetPosition = toolsSection.offsetTop;
          // Check if we're still not at the target (smooth scroll might not have worked)
          if (Math.abs(currentPosition - targetPosition) > 100) {
            toolsSection.scrollIntoView({ behavior: 'auto' });
          }
        }, 300);
      } else {
        // For desktop, use smooth scroll
        toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Animated Icon */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-8 shadow-2xl">
              <Sparkles className="h-10 w-10 text-white animate-pulse" />
            </div>
          </div>

          {/* Animated Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
            {title.split('').map((char, index) => (
              <span
                key={index}
                className={`inline-block transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Animated Subtitle */}
          <p className={`text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 leading-relaxed transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {subtitle}
          </p>

          {/* CTA Button - Enhanced for mobile */}
          <button
            onClick={handleExploreClick}
            className={`inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 active:scale-95 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '800ms' }}
            // Add touch-specific styles for mobile
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span className="text-base sm:text-lg">Explore AI Tools</span>
            <ArrowDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5 animate-bounce" />
          </button>
        </div>

        {/* Scroll Indicator - Hidden on mobile for cleaner UI */}
        <div className={`hidden sm:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 mb-2">Scroll to discover</span>
            <div className="w-px h-8 bg-gradient-to-b from-purple-500 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Mobile-specific scroll hint */}
        <div className={`sm:hidden absolute bottom-6 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-500 mb-1">Tap button to explore</span>
            <div className="w-px h-6 bg-gradient-to-b from-purple-500 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;